import { MuzikaConsole, MuzikaContractSummary } from '@muzika/core';
import * as async from 'async';
import * as ffmpegStatic from 'ffmpeg-static';
import * as ffprobeStatic from 'ffprobe-static';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ManualProgress, ProgressSet } from '../utils/progress';
import * as imagemagick from 'imagemagick-native';
import { FileUploadInterface, MuzikaFileUtil } from './ipfs-file';
import { StreamingUtil } from '../utils';

const ffmpeg = require('fluent-ffmpeg');


export class MuzikaMusicFile implements FileUploadInterface {
  filePath: string;
  cipherKey: Buffer = null;
  preview: string[] = [];
  tempDirs: string[] = [];
  totalProgress: ProgressSet;
  private _fileBaseName: string;
  private _fileExt: string;
  private _streamProgress: ManualProgress;
  private _uploadProgress: ProgressSet;
  private _previewGenProgress: ManualProgress;

  /**
   * Constructs an instance for building parameters for uploading music files to IPFS.
   * @param {string} filePath the real path of the file in local.
   * @param preview preview files info for the file.
   * @param {Buffer} cipherKey Buffer instance that represents AES-256 key or null for not encryption.
   */
  constructor(filePath: string, preview: string[], cipherKey: Buffer = null) {
    this.filePath = filePath;
    this.cipherKey = cipherKey;
    this.preview = preview;

    this._fileBaseName = path.basename(this.filePath);
    this._fileExt = path.extname(this._fileBaseName);

    // add upload progress to track how the upload be completed.
    this._uploadProgress = new ProgressSet([]);
    this.totalProgress = new ProgressSet([this._uploadProgress]);

    // if streaming convertion is needed, add stream progress and upload progress.
    if ((MuzikaFileUtil.HLS_CONVERSION_EXTENSION).includes(this._fileExt)) {
      this._streamProgress = new ManualProgress();
      this.totalProgress.registerProgress(this._streamProgress);
    }

    // if preview file exists, register preview progress.
    if (this._needPreviewGeneration()) {
      // if it has preview, add progress for preview.
      this._previewGenProgress = new ManualProgress(0.5);
      this.totalProgress.registerProgress(this._previewGenProgress);
    }
  }

  ready(uploadQueue: any[], summary: MuzikaContractSummary) {
    return (callback) => {
      this.totalProgress.start();

      this._readyOriginFile(uploadQueue, summary);
      this._readyPreviewFile(uploadQueue).then(() => {
        // if the file is audio or video file like mp3, mp4, or etc, generate streaming files.
        if ((MuzikaFileUtil.HLS_CONVERSION_EXTENSION).includes(this._fileExt)) {
          this._readyStreamingFile(uploadQueue).then(() => {
            this._uploadProgress.start();
            callback(null, null);
          }, err => {
            callback(err, null);
          });
        } else {
          this._uploadProgress.start();
          return callback(null, null);
        }
      }).catch((err) => {
        MuzikaConsole.log(err);
        return callback(err, null);
      });
    };
  }

  removeTempFiles(callback: (err) => void) {
    // this function must be called after uploaded
    async.each(this.tempDirs, (tempDir, rmCallback) => {
      fs.readdir(tempDir, (readErr, tempFiles) => {
        if (readErr) {
          return rmCallback(readErr);
        } else {
          async.each(tempFiles, (tempFile, unlinkCallback) => {
            // remove files
            fs.unlink(path.join(tempDir, tempFile), (unlinkErr) => {
              return unlinkCallback(unlinkErr);
            });
          }, (unlinkErr) => {
            if (unlinkErr) {
              return rmCallback(unlinkErr);
            }

            // remove empty directory after removing files
            fs.rmdir(tempDir, (rmdirErr) => {

              // if having errors and error is not ENOENT(NO ENTRY ERROR)
              if (rmdirErr && rmdirErr.code !== 'ENOENT') {
                return rmCallback(rmdirErr);
              } else {
                return rmCallback();
              }
            });
          });
        }
      });
    }, (rmErr) => {
      if (rmErr) {
        return callback(rmErr);
      }
    });
  }

  /**
   * Adds original files to the upload queue. The original files will be encrypted if having cipher key.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   * @param summary meta data that represents contract IPFS object structure.
   */
  private _readyOriginFile(uploadQueue: any[], summary: MuzikaContractSummary) {
    const ipfsPath = MuzikaFileUtil.buildFilePath(
      !!this.cipherKey, MuzikaFileUtil.ORIGIN_FILE_DIRECTORY, this._fileBaseName
    );
    const fileType = MuzikaFileUtil.getFileType(this._fileBaseName);
    uploadQueue.push({
      path: ipfsPath,
      content: this._buildContent(this.filePath, true)
    });

    summary.files.push({
      type: fileType,
      path: ipfsPath,
      encrypted: !!this.cipherKey,
      // if preview file that user uploads exists or file type is sheet (if file type is sheet, it automatically generates preview files
      // although it has no preview files), set true else set to false.
      hasPreview: (this.preview.length > 0 || fileType === 'sheet'),
      // TODO: various type streaming supports
      streamingSupportList: []
    });
  }

  /**
   * Adds preview files to the upload queue. Preview files will not be encrypted.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   */
  private _readyPreviewFile(uploadQueue: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preview.length) {
        // if preview exists, only upload the preview file
        this.preview.forEach((preview, idx) => {
          const previewFileExt = path.extname(preview);
          uploadQueue.push({
            // Never encrypt preview files even though the cipher key taken
            path: MuzikaFileUtil.buildFilePath(
              false, MuzikaFileUtil.PREVIEW_FILE_DIRECTORY, this._fileBaseName, `${idx}${previewFileExt}`
            ),
            content: this._buildContent(preview, false)
          });
        });
        return resolve(null);
      } else {
        // if preview does not exist and it's PDF file, generate preview images for it.
        if (this._fileExt.toLowerCase() !== '.pdf') {
          return resolve(null);
        }

        // TODO: need to track preview generation progress correctly.
        this._previewGenProgress.setProgressPercent(0.2);
        imagemagick.generatePreview({
          pdfPath: this.filePath
        }, (err, previewPNGImages) => {
          if (err) {
            return reject(err);
          }

          previewPNGImages.forEach((previewImage, idx) => {
            uploadQueue.push({
              path: MuzikaFileUtil.buildFilePath(
                false, MuzikaFileUtil.PREVIEW_FILE_DIRECTORY, this._fileBaseName, `${idx}.png`
              ),
              content: this._buildContent(previewImage, false)
            });

            this._previewGenProgress.setProgressPercent(1.0);
            return resolve(null);
          });
        });
      }
    });
  }

  /**
   * Returns whether this file need to be generated previews.
   *
   * @returns {boolean} whether this file need to be generated previews.
   */
  private _needPreviewGeneration() {
    return this.preview.length === 0 && this._fileExt.toLowerCase() === '.pdf';
  }

  /**
   * Generates streaming files and upload all streaming files to the upload queue. They will be encrypted if having cipher key.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   */
  private _readyStreamingFile(uploadQueue: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      // generate a temporary directory for save streaming files generated
      const tempDir = os.tmpdir();
      fs.mkdtemp(tempDir, (mkdErr, tempDirPath) => {
        if (mkdErr) {
          return reject(mkdErr);
        }

        this.tempDirs.push(tempDirPath);

        // TODO: support various options in conversion
        StreamingUtil.convert(this.filePath, StreamingUtil.VIDEO_OPTION.MIDDLE_QUALITY, tempDirPath)
          .subscribe(
            (progress) => {
              this._streamProgress.setProgressPercent(progress.percent / 100);
            },
            (err) => {
              return reject(err);
            },
            () => {
              fs.readdir(tempDirPath, (readDirErr, streamingFiles) => {
                if (readDirErr) {
                  return reject(readDirErr);
                }

                // set streaming conversion completed
                this._streamProgress.setProgressPercent(1);

                async.each(streamingFiles, (streamFileName, streamUploadCallback) => {
                  const streamFilePath = path.join(tempDirPath, streamFileName);
                  uploadQueue.push({
                    path: MuzikaFileUtil.buildFilePath(
                      !!this.cipherKey, MuzikaFileUtil.STREAMING_FILE_DIRECTORY, this._fileBaseName, streamFileName
                    ),
                    content: this._buildContent(streamFilePath, true)
                  });
                  streamUploadCallback();
                }, () => resolve(null));
              });
            });
        });
    });
  }

  /**
   * Build a file content in IPFS.
   * @param {string | Buffer} file real file path in local.
   * @param {boolean} encryption True for encryption or false if not.
   */
  private _buildContent(file: string | Buffer, encryption: boolean) {
    return MuzikaFileUtil.buildContent(file, (encryption && this.cipherKey) ? this.cipherKey : null, this._uploadProgress);
    // }
  }
}
