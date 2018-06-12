import {BrowserWindow, ipcMain} from 'electron';
import * as fs from 'fs';
import {createReadStream} from 'fs';
import * as request from 'request';
import * as tempfile from 'tempfile';
import {IPCUtil} from '../shared/ipc-utils';
import {BlockUtil} from './block/block';
import {BlockKey} from './block/block-key';
import {electronEnvironment} from './environment';
import {IpfsServiceInstance} from './ipfs.service';
import {StorageServiceInstance} from './storage.service';
import * as path from 'path';
import {BlockPaddingStream} from './cipher/block-stream';
import {AESCBCEncryptionStream} from './cipher/aes-stream';

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
                plugins: true,
              },
            });
            pdfWindow.loadURL('file://' + filename);

            ipcResolve(filename);
          });
        }
      );
    });


    this.eventHandler(IPCUtil.EVENT_FILE_UPLOAD, (ipcResolve, ipcReject, _files, encryption: boolean) => {
      /**
       * @param {Object[]} files Array of files having absolute path
       * @param {boolean} encryption Whether encrypt or not. If true, do block encryption.
       */
      const files: {path: string, previews: string[]}[] = _files;
      const ipfs = IpfsServiceInstance;
      let uploadFiles = [];

      // TODO : encrypt by AES stream. (need to refactor block module)
      const aesKey = BlockUtil.generateAESKey();

      files.forEach(file => {
        uploadFiles.push({
          path: path.join('/ipfs', path.basename(file.path)),
          content:
            (encryption) ?
              // if encryption parameter is true, push ipfs with encrypted
              createReadStream(file.path).pipe(new BlockPaddingStream({})).pipe(new AESCBCEncryptionStream({key: aesKey}))
              // if not encryption, push ipfs with plain
              : createReadStream(file.path)
        });

        file.previews.forEach((preview, idx) => {
          uploadFiles.push({
            path: path.join('/preview', path.basename(file.path), `${idx}${path.extname(preview)}`),
            content: createReadStream(preview)
          });
        });
      });

      // Wrapping paths into single folder
      // (e.g. [/ipfs/sheet.pdf, /preview/img.png] => [/muzika/ipfs/sheet.pdf, /muzika/preview/img.png]
      // Because of getting hash of root folder
      uploadFiles = uploadFiles.map(file => {
        file.path = path.join('/muzika', file.path).replace(/\\/g, '/');

        return file;
      });

      ipfs.put(uploadFiles, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        // find root object from uploaded objects in IPFS
        const rootObject = result.find((object) => {
          return object.path === 'muzika';
        });

        // get random peer from server
        const uploadHelper = ipfs.getRandomPeer();

        // request to a helper, which downloads the user's files, so helps to spread them out.
        request.post(
          {
            url: `${uploadHelper}/file/${rootObject.hash}`,
            json: true
          },
          (peerRequestError, res, body) => {
            if (peerRequestError) {
              ipcReject(peerRequestError);
            } else if (res.statusCode !== 200) {
              ipcReject(new Error('Response is not valid - failed with code: ' + res.statusCode));
            } else {
              ipcResolve(rootObject.hash, aesKey);
            }
          }
        );
      });
    });

  }
}

export const IpcMainServiceInstance = new IpcMainService();
