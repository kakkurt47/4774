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
    }
  }

  openPDFViewer(ipfs_url) {
    this.electronService.ipcRenderer.send('PDFViewer:open', ipfs_url);
  }
}
