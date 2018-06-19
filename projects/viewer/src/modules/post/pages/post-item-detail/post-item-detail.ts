import {NgRedux, select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommunityPost, IAppState, MusicPost, unitUp, User, VideoPost} from '@muzika/core';
import { BaseComponent, IMuzikaPaperContract, MuzikaCoin, MuzikaPaperContract, PostActions, UserActions } from '@muzika/core/angular';
import {AlertifyInstnace} from '@muzika/core/browser';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {CommunityPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {IpcRendererService} from '../../../../providers/ipc-renderer.service';

@Component({
  selector: 'app-post-community-item-detail',
  templateUrl: './community/post-community-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './community/post-community-item-detail.component.scss']
})
export class PostCommunityItemDetailComponent {
  post: CommunityPost = CommunityPostsMock[0];
}

@Component({
  selector: 'app-post-music-item-detail',
  templateUrl: './music/post-music-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './music/post-music-item-detail.component.scss']
})
export class PostMusicItemDetailComponent extends BaseComponent {
  paper: IMuzikaPaperContract;
  isPurchased = false;

  currentUser: User;

  postObs: Observable<MusicPost>;
  postSub: Subscription;
  post: MusicPost;

  constructor(private muzikaPaper: MuzikaPaperContract,
              private muzikaCoin: MuzikaCoin,
              private route: ActivatedRoute,
              private postActions: PostActions,
              private store: NgRedux<IAppState>,
              private ipcRenderer: IpcRendererService) {
    super();
  }

  ngOnInit() {

    this._sub.push(
      UserActions.currentUserObs.subscribe(async user => {
        this.currentUser = user;
      })
    );

    this._sub.push(
      this.route.params.subscribe(params => {
        const postId = params['id'];

        if (this.postSub) {
          this.postSub.unsubscribe();
        }

        this.postSub = combineLatest(
          this.store.select<MusicPost>(['post', 'post', 'music', postId]),
          UserActions.currentUserObs
        ).subscribe(async ([post, user]) => {
          this.post = post;
          this.paper = this.muzikaPaper.at(post.music_contract.contract_address);

          if (user) {
            this.isPurchased = await this.paper.isPurchased(user.address);
            this.post.price = unitUp(await this.paper.price());
          }
        });

        this.postActions.loadPost('music', postId);
      })
    );
  }

  purchase() {
    AlertifyInstnace.confirm('Are you sure to purchase this music?', () => {
      this._purchase();
    });
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

@Component({
  selector: 'app-post-video-item-detail',
  templateUrl: './video/post-video-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './video/post-video-item-detail.component.scss']
})
export class PostVideoItemDetailComponent {
  post: VideoPost = VideoPostsMock[0];
}

