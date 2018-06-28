import { ProgressSet } from '../utils/progress';
import * as path from 'path';
import * as fs from 'fs';
import { MuzikaConsole, MuzikaContractSummary, promisify } from '@muzika/core';

/**
 * This class generates parameter in add function in js-ipfs node instance.
 */
export interface IpfsUploadInterface {
  filePath: string;
  totalProgress: ProgressSet;

  /**
   * Returns a callback function that preprocesses something such as deciding path in IPFS object, generating stream files, and etc before
   * uploading to IPFS.
   *
   * @param uploadQueue upload queue for uploading to IPFS.
   * @param summary information instance for the IPFS object structure of a contract
   * @returns {(callback) => any} a function that preprocesses before uploading to IPFS and call callback function.
   */
  ready(uploadQueue: any[], summary: MuzikaContractSummary): Promise<void>;

  /**
   * Removes temporary directories including the files of directories. This must be called when finishing to upload to IPFS.
   */
  removeTempFiles(): Promise<any>;
}


export class MuzikaFileUtil {
  public static SHEET_EXTENSION = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];
  public static AUDIO_EXTENSION = ['.mp3', '.wav'];
  public static VIDEO_EXTENSION = ['.mp4'];
  public static HLS_CONVERSION_EXTENSION = MuzikaFileUtil.AUDIO_EXTENSION.concat(MuzikaFileUtil.VIDEO_EXTENSION);
  public static PUBLIC_FILE_EXTENSION = MuzikaFileUtil.VIDEO_EXTENSION;

  public static ORIGIN_FILE_DIRECTORY = '/ipfs';
  public static STREAMING_FILE_DIRECTORY = '/streaming';
  public static PREVIEW_FILE_DIRECTORY = '/preview';
  public static COVER_FILE_DIRECTORY = '/cover';
  public static PUBLIC_FILE_DIRECTORY = '/public';

  public static COVER_IMAGE = {
    SQUARE: {
      WIDTH: 512,
      HEIGHT: 512
    },

    RECT: {
      WIDTH: 512,
      HEIGHT: 288
    }
  };

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

  /**
   * Remove directory with all files in it.
   * @param {string} dirPath the directory path to remove.
   */
  public static removeDirectory(dirPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // query all files and directories in the directory to remove.
      promisify(fs.readdir, dirPath).then(files => {

        // convert file paths to absolute path
        files = files.map((file) => path.join(dirPath, file));

        // remove each files
        Promise.all(files.map((file) => {
          return new Promise((rsv, rej) => {
            // check if the file is directory or file.
            promisify(fs.lstat, file).then((stats) => {

              if (stats.isDirectory()) {
                // if directory, remove by calling this function recursively.
                this.removeDirectory(file).then(() => rsv()).catch((err) => rej(err));

              } else if (stats.isFile()) {
                // if file, unlink it.
                promisify(fs.unlink, file).then(() => rsv()).catch((err) => {
                  MuzikaConsole.error(`Failed to remove temporary file.. (${file})`, err);
                  return rej(err);
                });
              }
            }).catch(err => {
              // failed to query stat
              MuzikaConsole.error(`Failed to remove temporary file.. (${file})`, err);
              return rej(err);
            });
          });
        })).then(() => {
          // if success to remove files and directories in the directory, finally remove the empty directory.
          promisify(fs.rmdir, dirPath).then(() => {
            MuzikaConsole.log(`Success to remove temporary directory (${dirPath})`);
            return resolve();
          }).catch(err => {
            MuzikaConsole.error(`Failed to remove temporary directory.. (${dirPath})`, err);
            return reject(err);
          });
        }).catch(err => {
          return reject(err);
        });

      }).catch(err => {
        MuzikaConsole.error(`Failed to remove temporary directory.. (${dirPath})`);
        return reject(err);
      });
    });
  }
}
