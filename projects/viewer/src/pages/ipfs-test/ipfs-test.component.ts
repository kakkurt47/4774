import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';
import {IPCUtil} from '../../../shared/ipc-utils';
import {IpcRendererService} from '../../providers/ipc-renderer.service';

// import ipcRenderer = Electron.ipcRenderer;


@Component({
  selector: 'app-ipfs-test',
  templateUrl: './ipfs-test.component.html',
  styleUrls: ['./ipfs-test.component.scss']
})
export class IPFSTestPageComponent extends BaseComponent {
  ipfsHash: string;
  pathsForUpload: string[] = [];
  uploadedHash: string;

  constructor(private ipcRenderer: IpcRendererService) {
    super();
  }

  ngOnInit() {
  }

  changeFile(event: any) {
    this.pathsForUpload.push(event.target.files[0].path);
  }

  submitUpload() {
    this.ipcRenderer
      .sendAsync(IPCUtil.EVENT_FILE_UPLOAD, this.pathsForUpload, true)
      .subscribe(([hash, aesKey]) => {
        this.uploadedHash = hash;
      });
  }

  submitDownload() {
    window.location.href = `http://ipfs.io/ipfs/${this.ipfsHash}`;
  }
}
