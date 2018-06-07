import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {IPCUtil} from '../../shared/ipc-utils';
import {ElectronService} from './electron.service';

// console.log(ipcRenderer.sendSync('PDFViewer:open', 'ping')); // prints "pong"

@Injectable()
export class IpcRendererService {
  constructor(private electronService: ElectronService,
              private zone: NgZone) {
  }

  init() {
  }

  sendAsync<T = any>(eventType: string, ...args): Observable<T> {
    return new Observable<T>((observer) => {
      const uuid = IPCUtil.uuid();
      this.electronService.ipcRenderer.once(IPCUtil.wrap(eventType + '::received', uuid),
        (event, error, ...responseArgs) => {
          this.zone.run(() => {
            if (error) {
              observer.error(error);
            } else {
              if (responseArgs.length <= 1) {
                observer.next(...responseArgs);
              } else {
                observer.next(responseArgs);
              }
            }
          });
        });

      this.electronService.ipcRenderer.send(eventType, uuid, ...args);
    });
  }

  openPDFViewer(contractAddress) {
    return this.sendAsync(IPCUtil.EVENT_PDF_VIEWER_OPEN, contractAddress);
  }
}
