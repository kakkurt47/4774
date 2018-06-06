import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core';
import {IpcRendererService} from '../../providers/ipc-renderer.service';

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

  constructor(private ipcRenderer: IpcRendererService) {
    super();
  }

  ngOnInit() {
  }

  changeFile(event: any) {
    this.ipfsFile = event.target.files[0];
  }

  submitUpload() {
    const reader = new FileReader();
    reader.onload = (err) => {
      if (err) {
        console.log(err);
      }
      this.ipcRenderer
        .sendAndWaitForResult('File:IPFSUpload', Buffer.from(reader.result), true)
        .then(hash => {
          this.uploadedHash = hash;
        });
    };
    reader.readAsArrayBuffer(this.ipfsFile);
  }

  submitDownload() {
    window.location.href = `http://ipfs.io/ipfs/${this.ipfsHash}`;
  }
}
