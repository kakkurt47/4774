import {NgRedux, select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommunityPost, IAppState, MusicPost, unitDown, unitUp, User, VideoPost} from '@muzika/core';
import {BaseComponent, IMuzikaPaperContract, MuzikaCoin, MuzikaPaperContract, PostActions} from '@muzika/core/angular';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {CommunityPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {AlertService} from '../../../../providers/alert.service';

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

  @select(['user', 'currentUser'])
  currentUserObs: Observable<User>;
  currentUser: User;

  postObs: Observable<MusicPost>;
  postSub: Subscription;
  post: MusicPost;

  constructor(private muzikaPaper: MuzikaPaperContract,
              private muzikaCoin: MuzikaCoin,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private postActions: PostActions,
              private store: NgRedux<IAppState>) {
    super();
  }

  ngOnInit() {

    this._sub.push(
      this.currentUserObs.subscribe(async user => {
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
          this.currentUserObs
        ).subscribe(async ([post, user]) => {
          this.post = post;
          // this.paper = this.muzikaPaper.at(post.sheet_music.contract_address);

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
    this.alertService.confirm('Are you sure to purchase this music?', () => {
      this._purchase();
    });
  }

  sheetView() {
    if (!this.isPurchased) {
      this.alertService.alert('Should purchase first to download file');
      return;
    } else {
      // @TODO Add music view
    }
  }

  private async _purchase() {
    const coin = await this.muzikaCoin.deployed();

    try {
      const estimateGas = await coin.increaseApprovalAndCall.estimateGas(
        this.post.music_contract.contract_address,
        unitDown(this.post.price),
        '0x',
        {from: this.currentUser.address}
      );
      await coin.increaseApprovalAndCall(
        this.post.music_contract.contract_address,
        unitDown(this.post.price),
        '0x',
        {from: this.currentUser.address, gas: estimateGas + 30000}
      );
    } catch (e) {
      this.alertService.alert(e.message);
      console.error(e);
    }
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

