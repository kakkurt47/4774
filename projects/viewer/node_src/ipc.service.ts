import {ipcMain, BrowserWindow} from 'electron';
import * as fs from 'fs';
import * as request from 'request';
import * as tempfile from 'tempfile';
import {Block} from './block/block';
import {BlockKey} from './block/block-key';
import {electronEnvironment} from './environment';
import {IpfsServiceInstance} from './ipfs.service';

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

          const blob = decryptedBlock.data;
          const url = URL.createObjectURL(blob);
          const pdfWindow = new BrowserWindow({
            width: 1024,
            height: 800,
            webPreferences: {
              plugins: true,
            },
          });
          pdfWindow.loadURL(url);

          event.sender.send('PDFViewer:opened', url);
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

    ipcMain.on('File:uploadByIPFS', (event, blob) => {
      const ipfs = IpfsServiceInstance;
      ipfs.put(blob, (err, result) => {
        const helper = ipfs.getRandomPeer();
        request.post({
            url: `${helper}/api/file/${result[0].hash}`,
            json: true
          },
          (peerRequestError, res, body) => {
            if (body && body.status === 'success') {
              event.sender.send('File:uploadedByIPFS', peerRequestError, result[0].hash);
            } else {
              event.sender.send('File:uploadedByIPFS', peerRequestError, null);
            }
          }
        );
      });
    });
  }
}

export const IpcMainServiceInstance = new IpcMainService();
