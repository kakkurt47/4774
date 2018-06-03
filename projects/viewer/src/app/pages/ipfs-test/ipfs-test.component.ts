import {Component} from '@angular/core';
import {APIConfig, BaseComponent, LocalStorage} from '@muzika/core';
import {IpcRendererService} from '../../services/ipc-renderer.service';
import {IpfsEventService} from '../../services/ipfs-event.service';

// import ipcRenderer = Electron.ipcRenderer;


@Component({
  selector: 'app-ipfs-test',
  templateUrl: './ipfs-test.component.html',
  styleUrls: ['./ipfs-test.component.scss']
})
export class IPFSTestPageComponent extends BaseComponent {
  ipfsHash: string;
  ipfsFile: File;
  uploadedHash: string;

  constructor(private apiConfig: APIConfig,
              private localStorage: LocalStorage,
              private ipcRenderer: IpcRendererService,
              private ipfsEventService: IpfsEventService) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.ipfsEventService.event().subscribe(({type, data}) => {
        this.uploadedHash = data;
      })
    );
  }

  changeFile(event: any) {
    this.ipfsFile = event.target.files[0];
  }

  submitUpload() {
    this.ipcRenderer.uploadFile(this.ipfsFile);
  }

  submitDownload() {
    window.location.href = `http://ipfs.io/ipfs/${this.ipfsHash}`;
  }
}
