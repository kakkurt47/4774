import {FileUploadInterface, MuzikaFileUtil} from './ipfs-file';
import {ManualProgress, ProgressSet, ProgressStream} from '../utils';
import {MuzikaConsole, MuzikaContractSummary} from '@muzika/core';
import * as fs from 'fs';
import * as path from 'path';
import * as async from 'async';
import {StreamingUtil} from '../utils';
import * as os from 'os';

export class MuzikaPublicFile implements FileUploadInterface {
  filePath: string;
  totalProgress: ProgressSet;
  tempDirs: string[] = [];

  private _streamProgress: ManualProgress;
  private _uploadProgress: ProgressSet;
  private _fileBaseName: string;
  private _fileExt: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this._streamProgress = new ManualProgress();
    this._uploadProgress = new ProgressSet([]);
    this.totalProgress = new ProgressSet([this._uploadProgress]);

    this._fileBaseName = path.basename(this.filePath);
    this._fileExt = path.extname(this._fileBaseName);

    // if streaming convertion is needed, add stream progress and upload progress.
    if ((MuzikaFileUtil.HLS_CONVERSION_EXTENSION).includes(this._fileExt)) {
      this._streamProgress = new ManualProgress();
      this.totalProgress.registerProgress(this._streamProgress);
    }
  }

  ready(uploadQueue: any[], summary: MuzikaContractSummary): (err) => void {
    return (callback) => {
      this.totalProgress.start();
      MuzikaConsole.log('Start to ready public file', this._fileBaseName);

      if ((MuzikaFileUtil.PUBLIC_FILE_EXTENSION).includes(this._fileExt)) {
        this._readyStreamingFile(uploadQueue).then(() => {
          summary.videos.push({
            type: 'ipfs',
            path: `/public/${this._fileBaseName}/master.m3u8`
          });

          MuzikaConsole.log('Success to ready public file ', this.filePath);
          return callback(null);
        }).catch((err) => {
          MuzikaConsole.error('Failed to ready public file ', this.filePath);
          return callback(err);
        });
      } else {
        MuzikaConsole.error('Allowed Extension : ', MuzikaFileUtil.PUBLIC_FILE_EXTENSION);
        return callback(new Error('Not allowed extension'));
      }
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

  private _readyStreamingFile(uploadQueue: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      // generate a temporary directory for save streaming files generated
      const tempDir = os.tmpdir();
      fs.mkdtemp(tempDir, (mkdErr, tempDirPath) => {
        if (mkdErr) {
          MuzikaConsole.error(mkdErr);
          return reject(mkdErr);
        }

        this.tempDirs.push(tempDirPath);
        StreamingUtil.convert(this.filePath, StreamingUtil.VIDEO_OPTION.MIDDLE_QUALITY, tempDirPath).subscribe(
          (progress) => {
            MuzikaConsole.log(`Generating public stream files for ${this._fileBaseName} (${progress.percent}%)`);
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

              streamingFiles.forEach((streamFileName) => {
                const streamFilePath = path.join(tempDirPath, streamFileName);
                uploadQueue.push({
                  path: MuzikaFileUtil.buildFilePath(
                    false, MuzikaFileUtil.PUBLIC_FILE_DIRETORY, this._fileBaseName, streamFileName
                  ),
                  content: MuzikaFileUtil.buildContent(streamFilePath, null, this._uploadProgress)
                });
              });

              MuzikaConsole.log(`Complete to generate public stream files for ${this._fileBaseName}`);
              resolve(null);
            });
          });
      });
    });
  }

}
