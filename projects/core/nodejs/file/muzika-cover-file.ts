import { IpfsUploadInterface, MuzikaFileUtil } from './ipfs-upload.interface';
import { ProgressSet } from '../utils';
import {MuzikaContractSummary, promisify} from '@muzika/core';
import * as path from 'path';
import * as async from 'async';
import * as imagemagick from 'imagemagick-native';
import * as fs from 'fs';


export class MuzikaCoverFile implements IpfsUploadInterface {
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

  ready(uploadQueue: any[], summary: MuzikaContractSummary): Promise<void> {
    return new Promise((resolve, reject) => {
      this._readyForCoverImage(uploadQueue, summary)
        .then(() => {
          this.totalProgress.start();
          resolve();
        }).catch(err => reject(err));
    });
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

      promisify(fs.readFile, this.filePath).then(data => {
        Promise.all([
          this._createCoverImage(data,
            MuzikaFileUtil.COVER_IMAGE.RECT.WIDTH, MuzikaFileUtil.COVER_IMAGE.RECT.HEIGHT,
            'rect.png', uploadQueue, summary),
          this._createCoverImage(data,
            MuzikaFileUtil.COVER_IMAGE.SQUARE.WIDTH, MuzikaFileUtil.COVER_IMAGE.SQUARE.HEIGHT,
            'square.png', uploadQueue, summary),
        ]).then(() => resolve());
      }).catch(err => reject(err));
    });
  }

  /**
   * Creates a Promise for converting and creating a new cover image from original image.
   */
  private _createCoverImage(data: Buffer, width: number, height: number, filename: string,
                            uploadQueue: any[], summary: MuzikaContractSummary): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      promisify(imagemagick.convert, {
        srcData: data,
        format: 'png',
        width: width,
        height: height
      }).then(buffer => {
        const ipfsFilePath = MuzikaFileUtil.buildFilePath(false, MuzikaFileUtil.COVER_FILE_DIRECTORY, filename);

        uploadQueue.push({
          path: ipfsFilePath,
          content: MuzikaFileUtil.buildContent(buffer, null, this.totalProgress)
        });

        summary.coverImage.rect = ipfsFilePath;
        resolve();
      }).catch(err => reject(err));
    });
  }

  removeTempFiles(): Promise<void> {
    // cover file does not have any temp files
    return new Promise((resolve) => resolve());
  }

}
