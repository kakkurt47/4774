import {ipcMain, BrowserWindow} from 'electron';

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
  }
}

export const IpcMainServiceInstance = new IpcMainService();
