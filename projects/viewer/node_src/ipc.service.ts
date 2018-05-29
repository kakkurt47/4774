import {ipcMain, BrowserWindow} from 'electron';
import {baseApiUrl} from '../../core/src/config/api.constant';
import * as request from 'request';
import * as fs from 'fs';
import * as tempfile from 'tempfile';
import {BlockKey} from './block/block-key';
import {Block} from './block/block';

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pong';
// });

class IpcMainService {
  constructor() {
  }

  init() {
    ipcMain.on('PDFViewer:open', (event, ipfs_url) => {
      const blob = ipfs_url; // @ksw must rewrite it to blob (download from ipfs_url)
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
    });

    ipcMain.on('File:download', (event, contractAddress) => {
      // TODO: get file hash from contract address
      const blockKey = new BlockKey('');

      request.post(
        {
          url: `${baseApiUrl}/api/paper/${contractAddress}/download`,
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
          url: `${baseApiUrl}/test/paper/download`,
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
  }
}

export const IpcMainServiceInstance = new IpcMainService();
