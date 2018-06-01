import {Injectable, NgZone} from '@angular/core';
import {ElectronService} from '../providers/electron.service';
import {IpfsEventService} from './ipfs-event.service';

// console.log(ipcRenderer.sendSync('PDFViewer:open', 'ping')); // prints "pong"

@Injectable()
export class IpcRendererService {
  constructor(private electronService: ElectronService,
              private ipfsEventService: IpfsEventService,
              private zone: NgZone) {
  }

  init() {
    if (this.electronService.ipcRenderer) {
      this.electronService.ipcRenderer.on('PDFViewer:opened', (event, arg) => {
        console.log(arg); // prints "pong"
      });

      this.electronService.ipcRenderer.on('File:downloaded', (event, arg) => {
        console.log(arg);
      });

      this.electronService.ipcRenderer.on('File:uploadedByIPFS', (event, err, fileHash) => {
        this.zone.run(() => {
          this.ipfsEventService.emitEvent({type: 'ipfsHash', data: fileHash});
        });
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

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = (err) => {
      if (err) {
        console.log(err);
      }
      this.electronService.ipcRenderer.send('File:uploadByIPFS', Buffer.from(reader.result));
    };
    reader.readAsArrayBuffer(file);
  }
}
