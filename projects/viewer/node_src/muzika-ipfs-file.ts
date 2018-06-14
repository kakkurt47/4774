
import * as path from 'path';
import * as fs from 'fs';
import {BlockPaddingStream} from './cipher/block-stream';
import {AESCBCEncryptionStream} from './cipher/aes-stream';
import * as _ from 'lodash';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegStatic from 'ffmpeg-static';
import * as os from 'os';
import * as async from 'async';


export class MuzikaFileUtil {
  public static SOUND_EXTENSION = ['.mp3', '.wav'];
  public static VIDEO_EXTENSION = ['.mp4'];
  public static HLS_CONVERSION_EXTENSION = MuzikaFileUtil.SOUND_EXTENSION.concat(MuzikaFileUtil.VIDEO_EXTENSION);

  // Wrapping paths into single folder
  // (e.g. [/ipfs/sheet.pdf, /preview/img.png] => [/muzika/ipfs/sheet.pdf, /muzika/preview/img.png]
  // Because of getting hash of root folder
  public static ROOT_DIRECTORY = '/muzika';

  public static ORIGIN_FILE_DIRECTORY = path.join(MuzikaFileUtil.ROOT_DIRECTORY, 'ipfs');
  public static STREAMING_FILE_DIRECTORY = path.join(MuzikaFileUtil.ROOT_DIRECTORY, 'streaming');
  public static PREVIEW_FILE_DIRECTORY = path.join(MuzikaFileUtil.ROOT_DIRECTORY, 'preview');

  public static FFMPEG_BIN_PATH = ffmpegStatic.path;
}

export class MuzikaIPFSFile {
  filePath: string;
  cipherKey: Buffer = null;
  preview: {
    preview: string,
    idx: number
  }[] = [];
  tempDirs: string[] = [];

  private fileBaseName: string;
  private fileExt: string;

  constructor(filePath: string, preview: any, cipherKey?: Buffer) {
    this.filePath = filePath;
    this.cipherKey = cipherKey;
    this.preview = preview;

    this.fileBaseName = path.basename(this.filePath);
    this.fileExt = path.extname(this.fileBaseName);
  }

  ready(uploadQueue: any) {
    /**
     * Return a callback function that processes something such as deciding path in IPFS object, generating stream files, and etc before
     * uploading to IPFS.
     */
    return (callback) => {
      this._readyOriginFile(uploadQueue);
      this._readyPreviewFile(uploadQueue);

      // if the file is audio or video file like mp3, mp4, or etc, generate streaming files.
      if (_.includes(MuzikaFileUtil.HLS_CONVERSION_EXTENSION, this.fileExt)) {
        this._readyStreamingFile(uploadQueue, (err) => {
          return callback(err);
        });
      } else {
        return callback(null, null);
      }
    };
  }

  removeTempFiles(callback: (err) => void) {
    // this function must be called after uploaded
    async.each(this.tempDirs, (tempDir, rmCallback) => {
      console.log('REMOVING TEMPORARY DIRECTORY : ', tempDir);
      fs.readdir(tempDir, (readErr, tempFiles) => {
        if (readErr) {
          return rmCallback(readErr);
        } else {
          // remove files
          tempFiles.forEach((file) => {
            fs.unlink(path.join(tempDir, file), (unlinkErr) => {
              if (unlinkErr) {
                return rmCallback(unlinkErr);
              }
            });
          });
        }
      });
    }, (rmErr) => {
      return callback(rmErr);
    });
  }

  _readyOriginFile(uploadQueue: any) {
    uploadQueue.push({
      path: this._buildFilePath(!!this.cipherKey, MuzikaFileUtil.ORIGIN_FILE_DIRECTORY, this.fileBaseName),
      content:
        (this.cipherKey) ?
          // if encryption key exists, encrypted data.
          fs.createReadStream(this.filePath)
            .pipe(new BlockPaddingStream({}))
            .pipe(new AESCBCEncryptionStream({key: this.cipherKey}))
          // if encryption key does not exist, plain data.
          : fs.createReadStream(this.filePath)
    });
  }

  _readyPreviewFile(uploadQueue: any) {
    this.preview.forEach((preview, idx) => {
      uploadQueue.push({
        // Never encrypt preview files even though the cipher key taken
        path: this._buildFilePath(false, MuzikaFileUtil.PREVIEW_FILE_DIRECTORY, this.fileBaseName, `${idx}${this.fileExt}`),
        content: fs.createReadStream(this.filePath)
      });
    });
  }

  _readyStreamingFile(uploadQueue: any, callback: (err) => void) {
    ffmpeg.setFfmpegPath(MuzikaFileUtil.FFMPEG_BIN_PATH);

    // generate a temporary directory for save streaming files generated
    const tempDir = os.tmpdir();
    fs.mkdtemp(tempDir, (mkdErr, tempDirPath) => {
      if (mkdErr) {
        return callback(mkdErr);
      }

      this.tempDirs.push(tempDirPath);

      // conversion
      ffmpeg(this.filePath).addOptions([
        '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
        '-level 3.0',
        '-s 640x360',          // 640px width, 360px height output video dimensions
        '-start_number 0',     // start the first .ts segment at index 0
        '-hls_time 10',        // 10 second segment duration
        '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
        '-f hls'               // HLS format
      ]).output(path.join(tempDirPath, 'master.m3u8'))
        .on('error', (ffmpegErr) => {
          console.log('FAILED TO GENERATE STREAM FILES : ', ffmpegErr);
          return callback(ffmpegErr);
        })
        .on('end', () => {
          // query temporary directory
          fs.readdir(tempDirPath, (readDirErr, streamingFiles) => {
            if (readDirErr) {
              return callback(readDirErr);
            }

            streamingFiles.forEach((streamFileName) => {
              const streamFilePath = path.join(tempDirPath, streamFileName);
              uploadQueue.push({
                path: this._buildFilePath(!!this.cipherKey, MuzikaFileUtil.STREAMING_FILE_DIRECTORY, this.fileBaseName, streamFileName),
                content:
                  (this.cipherKey) ?
                    // if encryption key exists, encrypted data.
                    fs.createReadStream(streamFilePath)
                      .pipe(new BlockPaddingStream({}))
                      .pipe(new AESCBCEncryptionStream({key: this.cipherKey}))
                    // if encryption key does not exist, plain data.
                    : fs.createReadStream(streamFilePath)
              });
            });
            return callback(null);
          });
        })
        .on('progress', (progress) => {
          console.log(`generating stream files (${progress.percent}%)`);
        })
        .run();
        // TODO: progress event
    });
  }

  /**
   * Build a file path in IPFS.
   * @param {boolean} encryption add ".encrypted" extension if true.
   * @param args path arguments.
   * @returns {string} the file path in IPFS.
   */
  _buildFilePath(encryption: boolean, ...args) {
    // joining path parameters and convert it into IPFS file path

    // if encryption is true, add "encrypted" extension to the file.
    if (encryption) {
      args[args.length - 1] = `${args[args.length - 1]}.encrypted`;
    }

    return path.join(...args).replace(/\\/g, '/');
  }
}
