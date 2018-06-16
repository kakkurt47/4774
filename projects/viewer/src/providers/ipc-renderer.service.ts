import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {IPCUtil} from '../../shared/ipc-utils';
import {ElectronService} from './electron.service';

// console.log(ipcRenderer.sendSync('PDFViewer:open', 'ping')); // prints "pong"

@Injectable({providedIn: 'root'})
export class IpcRendererService {
  constructor(private electronService: ElectronService,
              private zone: NgZone) {
  }

  init() {
  }

  sendAsync(eventType: string, ...args) {
    return new Observable<any>((observer) => {
      const uuid = IPCUtil.uuid();
      this.electronService.ipcRenderer.once(IPCUtil.wrap(eventType + '::received', uuid),
        (event, error, ...responseArgs) => {
          this.zone.run(() => {
            if (error) {
              observer.error(error);
            } else {
              observer.next(responseArgs);
            }
          });
        });

      this.electronService.ipcRenderer.send(eventType, uuid, ...args);
    });
  }

  sendAsyncWithProgress(eventType: string, ...args) {
    return new Observable<any>((observer) => {
      const uuid = IPCUtil.uuid();

      const progressListener = (event, ...responseArgs) => {
        this.zone.run(() => {
          observer.next(['progress', ...responseArgs]);
        });
      };
      this.electronService.ipcRenderer.on(IPCUtil.wrap(eventType + '::progress', uuid), progressListener);

      this.electronService.ipcRenderer.once(IPCUtil.wrap(eventType + '::received', uuid),
        (event, error, ...responseArgs) => {
          this.electronService.ipcRenderer.removeListener(IPCUtil.wrap(eventType + '::progress', uuid), progressListener);
          this.zone.run(() => {
            if (error) {
              observer.error(error);
            } else {
              observer.next(['end', ...responseArgs]);
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
