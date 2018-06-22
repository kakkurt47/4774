import { BlockUtil, MuzikaConsole, MuzikaContractSummary, MuzikaFilePath } from '@muzika/core';
import * as async from 'async';
import { BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as request from 'request';
import { combineLatest } from 'rxjs';
import * as tempfile from 'tempfile';
import { IPCUtil } from '../shared/ipc-utils';
import { BlockKey, BufferStream, FileUploadInterface, MuzikaCoverFile, MuzikaPrivateFile } from '@muzika/core/nodejs';
import { electronEnvironment } from './environment';
import { IpfsServiceInstance } from './ipfs.service';
import { StorageServiceInstance } from './storage.service';
import {MuzikaPublicFile} from '../../core/nodejs/file/muzika-public-file';

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pong';
// });

class IpcMainService {
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
        const files: MuzikaFilePath[] = _files;
        const ipfs = IpfsServiceInstance;
        const uploadQueue = [];
        let uploadFiles: FileUploadInterface[] = [];

        // TODO: initialize meta data
        const contractInfo: MuzikaContractSummary = {
          version: '1.0',
          type: meta.type || 'sheet',
          title: meta.title || '',
          description: meta.description || '',
          author: meta.author || '',
          authorAddress: meta.authorAddress || '',
          coverImage: {},
          files: [],
          videos: []
        };

        // if encryption parameter is set, generate random AES-256 key for encryption.
        let aesKey = null;
        if (encryption) {
          aesKey = BlockUtil.generateAESKey();
        }

        // preprocess before uploading to IPFS.
        uploadFiles = files.map(file => new MuzikaPrivateFile(file.path, file.previews, aesKey));

        // if cover image exists, push it.
        if (meta.coverImagePath) {
          uploadFiles.push(new MuzikaCoverFile(meta.coverImagePath));
        }

        if (meta.musicVideo) {
          switch (meta.musicVideo.type) {
            case 'ipfs':
              // if the music video will be uploaded to IPFS
              uploadFiles.push(new MuzikaPublicFile(meta.musicVideo.path));
              break;

            case 'youtube':
              // if the music video is in the youtube
              contractInfo.videos.push(meta.musicVideo);
              break;
          }
        }

        combineLatest(...uploadFiles.map(file => file.totalProgress.onChange))
          .subscribe(percents => {
            ipcProgress(percents);
          });

        async.parallel(uploadFiles.map((uploadFile) => uploadFile.ready(uploadQueue, contractInfo)), (err) => {
          // if failed to ready for uploading data
          if (err) {
            return ipcReject(err);
          }

          // push meta data for contract description
          uploadQueue.push({
            path: '/muzika/meta.json',
            content: new BufferStream(Buffer.from(JSON.stringify(contractInfo)))
          });

          ipfs.put(uploadQueue)
            .then((result) => {
              MuzikaConsole.log('Finished to upload all files to IPFS.');
              // remove temporary files since finishing to upload files.
              // this is called even if failed to upload.
              uploadFiles.forEach((uploadFile) => uploadFile.removeTempFiles());

              // find root object from uploaded objects in IPFS
              const rootObject = result.find((object) => {
                return object.path === 'muzika';
              });

              MuzikaConsole.log('IPFS Root Hash : ', rootObject.hash);

              // get random peer from server
              const uploadHelper = ipfs.getRandomPeer();
              MuzikaConsole.log('IPFS PROPAGATOR : ', uploadHelper);

              // request to a helper, which downloads the user's files, so helps to spread them out.
              request.post(
                {
                  url: `${uploadHelper}/file/${rootObject.hash}`,
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
                    MuzikaConsole.log(`Success to request to prapagator! (https://ipfs.io/ipfs/${rootObject.hash})`);
                    ipcResolve(1, rootObject.hash, aesKey);
                  }
                }
              );
            })
            .catch((ipfsErr) => {
              MuzikaConsole.log('UPLOAD ERROR', ipfsErr);
              ipcReject(ipfsErr);
            });
        });
      });

  }
}

export const IpcMainServiceInstance = new IpcMainService();
