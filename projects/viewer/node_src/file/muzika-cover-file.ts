import {FileUploadInterface, MuzikaFileUtil} from './ipfs-file';
import {ProgressSet} from '../utils/progress';
import {MuzikaContractSummary} from '@muzika/core';
import * as path from 'path';


export class MuzikaCoverFile implements FileUploadInterface {
  filePath: string;
  totalProgress: ProgressSet;
  private _fileBaseName: string;
  private _fileExt: string;

  /**
   * Constructs an instance for building parameters for uploading cover image to IPFS.
   * @param {string} filePath real file path of the cover image in local.
   */
  constructor(filePath: string) {
    this.filePath = filePath;
    this.totalProgress = new ProgressSet([]);

    this._fileBaseName = path.basename(this.filePath);
    this._fileExt = path.extname(this._fileBaseName);
  }

  ready(uploadQueue: any[], summary: MuzikaContractSummary): (err) => void {
    return (callback) => {
      this._readyForCoverImage(uploadQueue, summary)
        .then(() => {
          this.totalProgress.start();
          callback();
        });
    };
  }

  /**
   * Adds cover image files to the upload queue. The cover image size is converted to proper size.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   * @param summary meta data that represents contract IPFS object structure.
   */
  private _readyForCoverImage(uploadQueue: any[], summary: MuzikaContractSummary): Promise<void> {
    // TODO: resize images for web
    return new Promise<void>((resolve, reject) => {
      const coverImagePath = MuzikaFileUtil.buildFilePath(
        false, MuzikaFileUtil.COVER_FILE_DIRECTORY, this._fileBaseName
      );

      uploadQueue.push({
        path: coverImagePath,
        content: MuzikaFileUtil.buildContent(this.filePath, null, this.totalProgress)
      });

      summary.coverImage.default = '/cover/' + this._fileBaseName;

      resolve();
    });
  }

  removeTempFiles(callback: (err) => void) {
    return callback(null);
  }

}
