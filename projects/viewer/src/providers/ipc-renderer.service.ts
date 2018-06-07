import {Injectable, NgZone} from '@angular/core';
import {IPCUtil} from '../../shared/ipc-utils';
import {ElectronService} from './electron.service';
import {from, Observable} from 'rxjs';

// console.log(ipcRenderer.sendSync('PDFViewer:open', 'ping')); // prints "pong"

@Injectable()
export class IpcRendererService {
  constructor(private electronService: ElectronService,
              private zone: NgZone) {
  }

  init() {
  }

  sendAsync<T = any>(eventType: string, ...args): Observable<T> {
    return from(new Promise<any>((resolve, reject) => {
      const uuid = IPCUtil.uuid();
      this.electronService.ipcRenderer.once(IPCUtil.wrap(eventType + '::received', uuid),
        (event, error, ...responseArgs) => {
          this.zone.run(() => {
            if (error) {
              reject(error);
            } else {
              resolve(...responseArgs);
            }
          });
        });

      this.electronService.ipcRenderer.send(eventType, uuid, ...args);
    }));
  }

  openPDFViewer(contractAddress) {
    return this.sendAsync(IPCUtil.EVENT_PDF_VIEWER_OPEN, contractAddress);
  }
}
