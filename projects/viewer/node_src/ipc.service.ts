import {BlockUtil, MuzikaConsole, MuzikaFilePath} from '@muzika/core';
import {BrowserWindow, ipcMain} from 'electron';
import * as fs from 'fs';
import * as request from 'request';
import * as tempfile from 'tempfile';
import {IPCUtil} from '../shared/ipc-utils';
import {BlockKey, MuzikaFileUploader, ProgressSet} from '@muzika/core/nodejs';
import {electronEnvironment} from './environment';
import {IpfsServiceInstance} from './ipfs.service';
import {StorageServiceInstance} from './storage.service';

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pong';
// });

export class IpcMainService {
  constructor() {
  }

  /**
   * @param {string} eventType
   * @param {Function} listener
   *
   * @use-case
   *   this.eventHandler('Event Type Example', (ipcSender, contractAddress, hash, ...) => {
   *      // do stuff with contractAddress, hash, ... arguments
   *
   *      // and send response to ipcRender
   *      ipcSender('hello', 'world');
   *   });
   *
   */
  eventHandler(eventType: string, listener: Function) {
    ipcMain.on(eventType, (event, uuid, ...args) => {
      const resolve = (...sendArgs) => {
        event.sender.send(IPCUtil.wrap(eventType + '::received', uuid), null, ...sendArgs);
      };
      const reject = (error) => {
        // @TODO If needed, serializeError
        event.sender.send(IPCUtil.wrap(eventType + '::received', uuid), error);
      };
      listener(resolve, reject, ...args);
    });
  }

  eventHandlerWithProgress(eventType: string, listener: Function) {
    ipcMain.on(eventType, (event, uuid, ...args) => {
      const progress = (...sendArgs) => {
        event.sender.send(IPCUtil.wrap(eventType + '::progress', uuid), ...sendArgs);
      };
      const resolve = (...sendArgs) => {
        event.sender.send(IPCUtil.wrap(eventType + '::received', uuid), null, ...sendArgs);
      };
      const reject = (error) => {
        event.sender.send(IPCUtil.wrap(eventType + '::received', uuid), error);
      };
      listener(progress, resolve, reject, ...args);
    });
  }

  init() {
    this.eventHandler(IPCUtil.EVENT_PDF_VIEWER_OPEN, (ipcResolve, ipcReject, contractAddress) => {
      // TODO: get file hash from contract address
      const blockKey = BlockKey.forRequest();

      // @TODO controls already downloaded file before
      request.post({
          url: `${electronEnvironment.base_api_url}/paper/${contractAddress}/download`,
          encoding: null,
          json: {
            'public_key': blockKey.publicKey // TODO: replace this publicKey to user's wallet public key
          },
          headers: {
            Authorization: `Bearer ${StorageServiceInstance.get('token')}`
          }
        }, (error, response, body) => {
          blockKey.receiveBlob(body);

          const blob = blockKey.block.data;

          const filename = tempfile();
          fs.writeFile(filename, blob, (err) => {
            if (err) {
              return;
            }

            const pdfWindow = new BrowserWindow({
              width: 1024,
              height: 800,
              webPreferences: {
                plugins: true
              }
            });
            pdfWindow.loadURL('file://' + filename);

            ipcResolve(filename);
          });
        }
      );
    });


    this.eventHandlerWithProgress(IPCUtil.EVENT_FILE_UPLOAD,
      (ipcProgress, ipcResolve, ipcReject, _files: MuzikaFilePath[], encryption: boolean, meta?: any) => {
        /**
         * @param {Object[]} files Array of files having absolute path
         * @param {boolean} encryption Whether encrypt or not. If true, do block encryption.
         */

          // if encryption parameter is set, generate random AES-256 key for encryption.
        let aesKey = null;
        if (encryption) {
          aesKey = BlockUtil.generateAESKey();
        }
        const fileUploader = new MuzikaFileUploader(meta.type || 'sheet', aesKey, meta);

        // preprocess before uploading to IPFS.
        _files.forEach(_file => fileUploader.insert(meta.type, _file.path));

        // if cover image exists, push it.
        if (meta.coverImagePath) {
          fileUploader.insert('cover', meta.coverImagePath);
        }

        // if public music video exists, insert music video into the ipfs directory or youtube URL.
        if (meta.musicVideo && meta.musicVideo.path) {
          switch (meta.musicVideo.type) {
            case 'ipfs':
              // if the music video will be uploaded to IPFS
              // uploadFiles.push(new MuzikaPublicFile(meta.musicVideo.path));
              fileUploader.insert('video', meta.musicVideo.path);
              break;

            case 'youtube':
              // if the music video is in the youtube
              fileUploader.insert('youtube', meta.musicVideo);
              break;
          }
        }

        const totalProgress = new ProgressSet([fileUploader.readyProgress, fileUploader.uploadProgress]);
        totalProgress.onChange.subscribe(percent => {
          MuzikaConsole.log(`TOTAL PERCENT : ${percent}%`);
          ipcProgress(percent);
        });

        fileUploader.ready().then(() => {
          fileUploader.upload(IpfsServiceInstance.node).then(hash => {
            MuzikaConsole.log('IPFS Root Hash : ', hash);
            const uploadHelper = IpfsServiceInstance.getRandomPeer();
            MuzikaConsole.log('IPFS PROPAGATOR : ', uploadHelper);

            request.post(
              {
                url: `${uploadHelper}/file/${hash}`,
                json: true
              },
              (peerRequestError, res, body) => {
                if (peerRequestError) {
                  MuzikaConsole.error('Failed to request to prapagator.');
                  ipcReject(peerRequestError);
                } else if (res.statusCode !== 200) {
                  MuzikaConsole.error(`Failed to request to prapagator. (ERROR CODE : ${res.statusCode})`);
                  ipcReject(new Error('Response is not valid - failed with code: ' + res.statusCode));
                } else {
                  MuzikaConsole.log(`Success to request to prapagator! (https://ipfs.io/ipfs/${hash})`);
                  ipcResolve(1, hash, aesKey);
                }
              }
            );
          });
        }).catch(err => {
          MuzikaConsole.error('UPLOAD ERROR', err);
          ipcReject(err);
        });
      });
  }
}

export const IpcMainServiceInstance = new IpcMainService();
