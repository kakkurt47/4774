import {ProgressSet, ProgressStream} from '../utils/progress';
import {BlockUtil, MuzikaContractSummary} from '@muzika/core';
import * as path from 'path';
import {BlockPaddingStream} from '../cipher/block-stream';
import * as fs from 'fs';
import {BufferStream} from '../utils/buffer-stream';
import {AESCBCEncryptionStream} from '../cipher/aes-stream';

/**
 * This class generates parameter in add function in js-ipfs node instance.
 */
export interface FileUploadInterface {
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
  ready(uploadQueue: any[], summary: MuzikaContractSummary): (err) => void;

  /**
   * Removes temporary directories including the files of directories. This must be called when finishing to upload to IPFS.
   *
   * @param {(err) => void} callback
   */
  removeTempFiles(callback: (err) => void);
}


export class MuzikaFileUtil {
  public static SHEET_EXTENSION = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];
  public static AUDIO_EXTENSION = ['.mp3', '.wav'];
  public static VIDEO_EXTENSION = ['.mp4'];
  public static HLS_CONVERSION_EXTENSION = MuzikaFileUtil.AUDIO_EXTENSION.concat(MuzikaFileUtil.VIDEO_EXTENSION);

  // Wrapping paths into single folder
  // (e.g. [/ipfs/sheet.pdf, /preview/img.png] => [/muzika/ipfs/sheet.pdf, /muzika/preview/img.png]
  // Because of getting hash of root folder
  public static ROOT_DIRECTORY = '/muzika';

  public static ORIGIN_FILE_DIRECTORY = MuzikaFileUtil.ROOT_DIRECTORY + '/ipfs';
  public static STREAMING_FILE_DIRECTORY = MuzikaFileUtil.ROOT_DIRECTORY + '/streaming';
  public static PREVIEW_FILE_DIRECTORY = MuzikaFileUtil.ROOT_DIRECTORY + '/preview';
  public static COVER_FILE_DIRECTORY = MuzikaFileUtil.ROOT_DIRECTORY + '/cover';

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
   * Build a file path in IPFS.
   *
   * @param {boolean} encryption add ".encrypted" extension if true.
   * @param args path arguments.
   * @returns {string} the file path in IPFS.
   */
  public static buildFilePath(encryption: boolean, ...args) {
    // joining path parameters and convert it into IPFS file path

    // if encryption is true, add "encrypted" extension to the file.
    if (encryption) {
      args[args.length - 1] = `${args[args.length - 1]}.encrypted`;
    }

    return path.join(...args).replace(/\\/g, '/');
  }

  /**
   * Build a file content in IPFS.
   * @param {string | Buffer} file real file path in local.
   * @param {boolean} cipherKey key for encryption. If null or undefined, don't encrypt.
   * @param {ProgressSet} progressSet progressSet for tracking file upload.
   */
  public static buildContent(file: string | Buffer, cipherKey?: Buffer, progressSet?: ProgressSet) {
    let fromStream;
    let progressStream;
    if (typeof file === 'string') {
      const stats = fs.statSync(file);
      progressStream = new ProgressStream({
        totalSize: (cipherKey) ? BlockUtil.getEncryptedSize(stats.size) : stats.size
      });
      progressSet.registerProgress(progressStream);
      fromStream = fs.createReadStream(file);
    } else {
      // maybe type is buffer.
      progressStream = new ProgressStream({
        totalSize: (cipherKey) ? BlockUtil.getEncryptedSize(file.length) : file.length
      });
      fromStream = new BufferStream(file);
    }

    // Although encryption parameter is true, don't encrypt if the cipher key not existing.
    if (cipherKey) {
      return fromStream
        .pipe(new BlockPaddingStream({}))
        .pipe(new AESCBCEncryptionStream({key: cipherKey}))
        .pipe(progressStream);
    } else {
      return fromStream
        .pipe(progressStream);
    }
  }
}
