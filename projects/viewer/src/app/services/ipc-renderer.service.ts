import {Injectable} from '@angular/core';
import {ElectronService} from '../providers/electron.service';

// console.log(ipcRenderer.sendSync('PDFViewer:open', 'ping')); // prints "pong"

@Injectable()
export class IpcRendererService {
  constructor(private electronService: ElectronService) {
  }

  init() {
    if (this.electronService.ipcRenderer) {
      this.electronService.ipcRenderer.on('PDFViewer:opened', (event, arg) => {
        console.log(arg); // prints "pong"
      });

      this.electronService.ipcRenderer.on('File:downloaded', (event, arg) => {
        console.log(arg);
      });
    }
  }

  openPDFViewer(ipfs_url) {
    this.electronService.ipcRenderer.send('PDFViewer:open', ipfs_url);
  }

  downloadFile(contractAddress) {
    this.electronService.ipcRenderer.send('File:download', contractAddress);
  }

  // test for download
  downloadFileTest() {
    this.electronService.ipcRenderer.send('File:downloadTest');
  }
}
