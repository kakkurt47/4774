import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {IPCUtil} from '../../../shared/ipc-utils';
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
        console.log(event, arg); // prints "pong"
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

  openPDFViewer(contractAddress) {
    this.electronService.ipcRenderer.send('PDFViewer:open', contractAddress);
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
      this.electronService.ipcRenderer.send('File:uploadByIPFS', Buffer.from(reader.result), true);
    };
    reader.readAsArrayBuffer(file);
  }

  /**
   * Upload Using IPFS
   *
   * @param {File} file
   * @returns {Observable<string>} IPFS Hash
   */
  uploadAsync(file: File): Observable<string> {
    const reader = new FileReader();

    return new Observable<string>(observer => {
      reader.onload = () => {
        if (reader.error) {
          observer.error(reader.error);
        } else {
          const uuid = IPCUtil.uuid();
          this.electronService.ipcRenderer.once(IPCUtil.wrap('File:IPFSUpload', uuid), (event, error, hash) => {
            this.zone.run(() => {
              if (error) {
                observer.error(error);
              } else {
                observer.next(hash);
                observer.complete();
              }
            });
          });

          this.electronService.ipcRenderer.send('File:IPFSUpload', uuid, Buffer.from(reader.result), true);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
