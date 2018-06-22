import { FileUploadInterface, MuzikaFileUtil } from './ipfs-file';
import { ProgressSet } from '../utils';
import { MuzikaContractSummary } from '@muzika/core';
import * as path from 'path';
import * as async from 'async';
import * as imagemagick from 'imagemagick-native';
import * as fs from 'fs';


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
        }).catch((err) => {
        callback(err);
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

      fs.readFile(this.filePath, (err, data) => {
        if (err) {
          return reject(err);
        }

        async.parallel([
          (callback) => {
            imagemagick.convert({
              srcData: data,
              format: 'png',
              width: MuzikaFileUtil.COVER_IMAGE.RECT.WIDTH,
              height: MuzikaFileUtil.COVER_IMAGE.RECT.HEIGHT
            }, (convertErr, buffer) => {
              if (convertErr) {
                return callback(convertErr);
              }

              uploadQueue.push({
                path: MuzikaFileUtil.buildFilePath(false, MuzikaFileUtil.COVER_FILE_DIRECTORY, 'rect.png'),
                content: MuzikaFileUtil.buildContent(buffer, null, this.totalProgress)
              });

              summary.coverImage.rect = '/cover/rect.png';
              callback();
            });
          },

          (callback) => {
            imagemagick.convert({
              srcData: data,
              format: 'png',
              width: MuzikaFileUtil.COVER_IMAGE.SQUARE.WIDTH,
              height: MuzikaFileUtil.COVER_IMAGE.SQUARE.HEIGHT
            }, (convertErr, buffer) => {
              if (convertErr) {
                return callback(convertErr);
              }

              uploadQueue.push({
                path: MuzikaFileUtil.buildFilePath(false, MuzikaFileUtil.COVER_FILE_DIRECTORY, 'square.png'),
                content: MuzikaFileUtil.buildContent(buffer, null, this.totalProgress)
              });

              summary.coverImage.square = '/cover/square.png';
              callback();
            });
          }
        ], (convertErr) => {
          if (convertErr) {
            return reject(convertErr);
          }

          return resolve();
        });
      });
    });
  }

  removeTempFiles(): Promise<void> {
    // cover file does not have any temp files
    return new Promise((resolve, reject) => resolve());
  }

}
