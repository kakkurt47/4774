import {ipcMain, BrowserWindow} from 'electron';
import * as fs from 'fs';
import * as request from 'request';
import * as tempfile from 'tempfile';
import {Block} from './block/block';
import {BlockKey} from './block/block-key';
import {electronEnvironment} from './environment';
import {IpfsServiceInstance} from './ipfs.service';
import {StorageServiceInstance} from './storage.service';

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pong';
// });

class IpcMainService {
  constructor() {
  }

  init() {
    ipcMain.on('PDFViewer:open', (event, contractAddress) => {
      // TODO: get file hash from contract address
      const blockKey = new BlockKey('');

      // @TODO controls already downloaded file before
      request.post(
        {
          url: `${electronEnvironment.base_api_url}/paper/${contractAddress}/download`,
          encoding: null,
          json: {
            'public_key': blockKey.publicKey // TODO: replace this publicKey to user's wallet public key
          },
          headers: {
            Authorization: `Bearer ${StorageServiceInstance.get('token')}`
          }
        },
        (error, response, body) => {
          const encryptedKey = new Buffer(body.slice(0, 256));
          const encryptedData = new Buffer(body.slice(256));

          const encryptedBlock = new Block(encryptedData, true, encryptedKey);
          const decryptedBlock = blockKey.decrypt(encryptedBlock);

          const blob = decryptedBlock.data;

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

            event.sender.send('PDFViewer:opened', filename);
          });
        }
      );
    });

    ipcMain.on('File:download', (event, contractAddress) => {
      // TODO: get file hash from contract address @ksw
      const blockKey = new BlockKey('');

      request.post(
        {
          url: `${electronEnvironment.base_api_url}/api/paper/${contractAddress}/download`,
          encoding: null,
          json: {
            'public_key': blockKey.publicKey
          }
        },
        (error, response, body) => {
          const encryptedKey = new Buffer(body.slice(0, 256));
          const encryptedData = new Buffer(body.slice(256));

          const encryptedBlock = new Block(encryptedData, true, encryptedKey);
          const decryptedBlock = blockKey.decrypt(encryptedBlock);

          const filename = tempfile();
          fs.writeFile(filename, decryptedBlock.data, (err) => {
            if (err) {
              event.sender.send('File:downloaded', null);
            } else {
              event.sender.send('File:downloaded', filename);
            }
          });
        }
      );
    });

    // test for file download
    ipcMain.on('File:downloadTest', (event) => {
      const blockKey = new BlockKey('QmSgRcqRvLukaDzWZTw2kWrUD1eFukDRwJpbB2U4ayDwsz');

      request.post(
        {
          url: `${electronEnvironment.base_api_url}/test/paper/download`,
          encoding: null,
          json: {
            'public_key': blockKey.publicKey
          }
        },
        (error, response, body) => {
          const encryptedKey = new Buffer(body.slice(0, 256));
          const encryptedData = new Buffer(body.slice(256));

          const encryptedBlock = new Block(encryptedData, true, encryptedKey);
          const decryptedBlock = blockKey.decrypt(encryptedBlock);

          const filename = tempfile();
          fs.writeFile(filename, decryptedBlock.data, (err) => {
            if (err) {
              event.sender.send('File:downloaded', null);
            } else {
              event.sender.send('File:downloaded', filename);
            }
          });
        }
      );

    });

    ipcMain.on('File:uploadByIPFS', (event, blob, encryption) => {
      /**
       * blob : file binary
       * encryption : whether encrypt or not. If true, do block encryption.
       */
      const ipfs = IpfsServiceInstance;
      let block = new Block(blob);
      let blockKey = null;

      if (encryption) {
        blockKey = new BlockKey(null);
        const blockRequest = blockKey.generateRequest(null);
        block = blockRequest.encrypt(block);
      }

      ipfs.put(block.data, (err, result) => {
        const helper = ipfs.getRandomPeer();
        request.post({
            url: `${helper}/api/file/${result[0].hash}`,
            json: true
          },
          (peerRequestError, res, body) => {
            if (body && body.status === 'success') {
              event.sender.send('File:uploadedByIPFS', peerRequestError, result[0].hash);
            } else {
              event.sender.send('File:uploadedByIPFS', peerRequestError, null, null);
            }
          }
        );
      });
    });
  }
}

export const IpcMainServiceInstance = new IpcMainService();
