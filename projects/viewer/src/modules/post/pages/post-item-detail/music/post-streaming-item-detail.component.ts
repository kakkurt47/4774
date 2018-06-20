import { Component, Injector } from '@angular/core';
import { MuzikaCoin, MuzikaPaperContract, PostActions } from '@muzika/core/angular';
import { IAppState } from '@muzika/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IpcRendererService } from '../../../../../providers/ipc-renderer.service';
import { AlertifyInstnace } from '@muzika/core/browser';
import { AbstractPostMusicItemDetail } from '../post-music-item-detail';

@Component({
  selector: 'app-post-music-item-detail',
  templateUrl: './post-streaming-item-detail.component.html',
  styleUrls: ['../post-item-detail.scss', './post-streaming-item-detail.component.scss']
})
export class PostStreamingItemDetailComponent extends AbstractPostMusicItemDetail {

  constructor(public postActions: PostActions,
              public store: NgRedux<IAppState>,
              public ipcRenderer: IpcRendererService,
              private injector: Injector) {
    super('music', injector);
  }

  purchase() {
    AlertifyInstnace.confirm('Are you sure to purchase this music?', this._purchase.bind(this));
  }

  sheetView() {
    if (!this.isPurchased) {
      AlertifyInstnace.alert('Should purchase first to download file');
      return;
    } else {
      this.ipcRenderer.openPDFViewer(this.post.music_contract.contract_address);
    }
  }

  private _purchase() {
    this.postActions
      .purchase(this.post.music_contract.contract_address, this.currentUser.address)
      .subscribe(
        txHash => {
          // @TODO process after purchase
        },
        err => {
          AlertifyInstnace.alert(err.message);
          console.error(err);
        }
      );
  }
}
