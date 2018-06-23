import {IpfsUploadInterface, MuzikaFileUtil} from './ipfs-upload.interface';
import {ManualProgress, ProgressSet, ProgressStream} from '../utils';
import {MuzikaConsole, MuzikaContractSummary, promisify} from '@muzika/core';
import * as fs from 'fs';
import * as path from 'path';
import * as async from 'async';
import {StreamingUtil} from '../utils';
import * as os from 'os';

export class MuzikaPublicFile implements IpfsUploadInterface {
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

  ready(uploadQueue: any[], summary: MuzikaContractSummary): Promise<void> {
    return new Promise((resolve, reject) => {
      this.totalProgress.start();
      MuzikaConsole.log('Start to ready public file', this._fileBaseName);

      if ((MuzikaFileUtil.PUBLIC_FILE_EXTENSION).includes(this._fileExt)) {
        this._readyStreamingFile(uploadQueue).then(() => {
          summary.videos.push({
            type: 'ipfs',
            path: `${MuzikaFileUtil.PUBLIC_FILE_DIRETORY}/${this._fileBaseName}/master.m3u8`
          });

          MuzikaConsole.log('Success to ready public file ', this.filePath);
          return resolve();
        }).catch((err) => {
          MuzikaConsole.error('Failed to ready public file ', this.filePath);
          return reject(err);
        });
      } else {
        MuzikaConsole.error('Allowed Extension : ', MuzikaFileUtil.PUBLIC_FILE_EXTENSION);
        return reject(new Error('Not allowed extension'));
      }
    });
  }

  removeTempFiles(): Promise<void> {
    // this function must be called after uploaded
    return new Promise((resolve, reject) => {
      Promise.all(this.tempDirs.map(tempDir => MuzikaFileUtil.removeDirectory(tempDir)))
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  private _readyStreamingFile(uploadQueue: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      // generate a temporary directory for save streaming files generated
      const tempDir = os.tmpdir();

      promisify(fs.mkdtemp, tempDir).then((tempDirPath) => {
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
            promisify(fs.readdir, tempDirPath).then((streamingFiles) => {
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
            }).catch(err => {
              return reject(err);
            });
          });
      }).catch(err => {
        MuzikaConsole.error(err);
        return reject(err);
      });
    });
  }

}
