import {BlockUtil} from '@muzika/core';
import * as async from 'async';
import * as ffmpegStatic from 'ffmpeg-static';
import * as ffprobeStatic from 'ffprobe-static';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {AESCBCEncryptionStream} from './cipher/aes-stream';
import {BlockPaddingStream} from './cipher/block-stream';
import {ProgressSet, ManualProgress, ProgressStream} from './utils/progress';
import * as imagemagick from 'imagemagick-native';
import {BufferStream} from './utils/buffer-stream';
import {MuzikaContractSummary} from '@muzika/core';


export class MuzikaFileUtil {
  public static SHEET_EXTENSION = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];
  public static AUDIO_EXTENSION = ['.mp3', '.wav'];
  public static VIDEO_EXTENSION = ['.mp4'];
  public static HLS_CONVERSION_EXTENSION = MuzikaFileUtil.AUDIO_EXTENSION.concat(MuzikaFileUtil.VIDEO_EXTENSION);

  // Wrapping paths into single folder
  // (e.g. [/ipfs/sheet.pdf, /preview/img.png] => [/muzika/ipfs/sheet.pdf, /muzika/preview/img.png]
  // Because of getting hash of root folder
  public static ROOT_DIRECTORY = '/muzika';

  public static ORIGIN_FILE_DIRECTORY = path.join(MuzikaFileUtil.ROOT_DIRECTORY, 'ipfs');
  public static STREAMING_FILE_DIRECTORY = path.join(MuzikaFileUtil.ROOT_DIRECTORY, 'streaming');
  public static PREVIEW_FILE_DIRECTORY = path.join(MuzikaFileUtil.ROOT_DIRECTORY, 'preview');

  public static getFileType(filename: string) {
    const ext = path.extname(filename).toLowerCase();
    if (this.SHEET_EXTENSION.includes(ext)) {
      return 'sheet';
    } else if (this.AUDIO_EXTENSION.includes(ext)) {
      return 'audio';
    } else if (this.VIDEO_EXTENSION.includes(ext)) {
      return 'video';
    }
  }
}

/**
 * Utils for streaming conversion. It defines several quality of options of streaming convertion for audio and video.
 */
export class StreamingUtil {
  public static FFMPEG_BIN_PATH = ffmpegStatic.path;
  public static FFPROBE_BIN_PATH = ffprobeStatic.path;

  // TODO : setting proper options for several quality.
  public static VIDEO_OPTION = {
    HIGH_QUALITY: [],
    MIDDLE_QUALITY: [
      '-profile:v baseline',    // baseline profile (level 3.0) for H264 video codec
      '-level 3.0',
      '-s 640x360',             // 640px width, 360px height output video dimensions
      '-start_number 0',        // start the first .ts segment at index 0
      '-hls_time 3',            // 3 second segment duration
      '-hls_list_size 0',       // Maxmimum number of playlist entries (0 means all entries/infinite)
      '-f hls'                  // HLS format
    ],
    LOW_QUALITY: []
  };

  public static AUDIO_OPTION = {
    HIGH_QUALITY: [],
    MIDDLE_QUALITY: [
      '-profile:v baseline',    // native FFmpeg AAC encoder
      '-level 3.0',
      '-start_number 0',        // start the first .ts segment at index 0
      '-hls_time 3',            // 3 second segment duration
      '-hls_list_size 0',       // Maxmimum number of playlist entries (0 means all entries/infinite)
      '-f hls'                  // HLS format
    ],
    LOW_QUALITY: []
  };
}

export class MuzikaIPFSFile {
  filePath: string;
  cipherKey: Buffer = null;
  preview: string[] = [];
  tempDirs: string[] = [];
  totalProgress: ProgressSet;
  private _fileBaseName: string;
  private _fileExt: string;
  private _streamProgress: ManualProgress;
  private _uploadProgress: ProgressSet;

  /**
   * Constructs an instance for building paramters for uploading to IPFS.
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
    this.totalProgress.start();
  }

  /**
   * Returns a callback function that preprocesses something such as deciding path in IPFS object, generating stream files, and etc before
   * uploading to IPFS.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   * @param summary information instance for the IPFS object structure of a contract
   * @returns {(callback) => any} a function that preprocesses before uploading to IPFS and call callback function.
   */
  ready(uploadQueue: any[], summary: MuzikaContractSummary) {
    /**
     * Return a callback function that processes something such as deciding path in IPFS object, generating stream files, and etc before
     * uploading to IPFS.
     */
    return (callback) => {
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
        console.log(err);
        return callback(err, null);
      });
    };
  }

  /**
   * Removes temporary directories including the files of directories. This must be called when finishing to upload to IPFS.
   *
   * @param {(err) => void} callback
   */
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
    const ipfsPath = this._buildFilePath(!!this.cipherKey, MuzikaFileUtil.ORIGIN_FILE_DIRECTORY, this._fileBaseName);
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
          uploadQueue.push({
            // Never encrypt preview files even though the cipher key taken
            path: this._buildFilePath(false, MuzikaFileUtil.PREVIEW_FILE_DIRECTORY, this._fileBaseName, `${idx}${this._fileExt}`),
            content: this._buildContent(preview, false)
          });
        });
        return resolve(null);
      } else {
        // if preview does not exist and it's PDF file, generate preview images for it.
        if (this._fileExt.toLowerCase() !== '.pdf') {
          return resolve(null);
        }

        imagemagick.generatePreview({
          pdfPath: this.filePath
        }, (err, previewPNGImages) => {
          if (err) {
            return reject(err);
          }

          previewPNGImages.forEach((previewImage, idx) => {
            uploadQueue.push({
              path: this._buildFilePath(false, MuzikaFileUtil.PREVIEW_FILE_DIRECTORY, this._fileBaseName, `${idx}.png`),
              content: this._buildContent(previewImage, false)
            });
            return resolve(null);
          });
        });
      }
    });
  }

  /**
   * Generates streaming files and upload all streaming files to the upload queue. They will be encrypted if having cipher key.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   */
  private _readyStreamingFile(uploadQueue: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg.setFfmpegPath(StreamingUtil.FFMPEG_BIN_PATH);
      ffmpeg.setFfprobePath(StreamingUtil.FFPROBE_BIN_PATH);

      // generate a temporary directory for save streaming files generated
      const tempDir = os.tmpdir();
      fs.mkdtemp(tempDir, (mkdErr, tempDirPath) => {
        if (mkdErr) {
          return reject(mkdErr);
        }

        this.tempDirs.push(tempDirPath);

        // conversion
        // TODO: support various streaming options for audio and video file
        ffmpeg(this.filePath).addOptions(StreamingUtil.VIDEO_OPTION.MIDDLE_QUALITY).output(path.join(tempDirPath, 'master.m3u8'))
          .on('error', (ffmpegErr) => {
            console.log('FAILED TO GENERATE STREAM FILES : ', ffmpegErr);
            return reject(ffmpegErr);
          })
          .on('end', () => {
            // query temporary directory
            fs.readdir(tempDirPath, (readDirErr, streamingFiles) => {
              if (readDirErr) {
                return reject(readDirErr);
              }

              // set streaming conversion completed
              this._streamProgress.setProgressPercent(1);

              async.each(streamingFiles, (streamFileName, streamUploadCallback) => {
                const streamFilePath = path.join(tempDirPath, streamFileName);
                uploadQueue.push({
                  path: this._buildFilePath(!!this.cipherKey, MuzikaFileUtil.STREAMING_FILE_DIRECTORY, this._fileBaseName, streamFileName),
                  content: this._buildContent(streamFilePath, true)
                });
                streamUploadCallback();
              }, () => resolve(null));
            });
          })
          .on('progress', (progress) => {
            console.log(`generating stream files (${progress.percent}%)`);
            this._streamProgress.setProgressPercent(progress.percent / 100);
          })
          .run();
      });
    });
  }

  /**
   * Build a file path in IPFS.
   *
   * @param {boolean} encryption add ".encrypted" extension if true.
   * @param args path arguments.
   * @returns {string} the file path in IPFS.
   */
  private _buildFilePath(encryption: boolean, ...args) {
    // joining path parameters and convert it into IPFS file path

    // if encryption is true, add "encrypted" extension to the file.
    if (encryption) {
      args[args.length - 1] = `${args[args.length - 1]}.encrypted`;
    }

    return path.join(...args).replace(/\\/g, '/');
  }

  /**
   * Build a file content in IPFS.
   * @param {string} filePath real file path in local.
   * @param {boolean} encryption True for encryption or false if not.
   */
  private _buildContent(file: string | Buffer, encryption: boolean) {
    let fromStream;
    let progressStream;
    if (typeof file === 'string') {
      const stats = fs.statSync(file);
      progressStream = new ProgressStream({
        totalSize: stats.size + (
          // if encrypted, addtional padding and data will be added
          (encryption && this.cipherKey) ?
            BlockUtil.GARBAGE_PADDING_SIZE + BlockUtil.IV_SIZE + BlockUtil.BLOCK_SIZE - stats.size % BlockUtil.BLOCK_SIZE
            : 0
        )
      });
      this._uploadProgress.registerProgress(progressStream);
      fromStream = fs.createReadStream(file);
    } else {
      // maybe type is buffer.
      progressStream = new ProgressStream({
        totalSize: file.length + (
          // if encrypted, addtional padding and data will be added
          (encryption && this.cipherKey) ?
            BlockUtil.GARBAGE_PADDING_SIZE + BlockUtil.IV_SIZE + BlockUtil.BLOCK_SIZE - file.length % BlockUtil.BLOCK_SIZE
            : 0
        )
      });
      fromStream = new BufferStream(file);
    }

    // Although encryption parameter is true, don't encrypt if the cipher key not existing.
    if (encryption && this.cipherKey) {
      return fromStream
        .pipe(new BlockPaddingStream({}))
        .pipe(new AESCBCEncryptionStream({key: this.cipherKey}))
        .pipe(progressStream);
    } else {
      return fromStream
        .pipe(progressStream);
    }
  }
}
