import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {
  BaseComponent,
  CommunityPost,
  MuzikaCoin,
  MuzikaPaperContract,
  SheetPost,
  unitDown, unitUp,
  User,
  VideoPost
} from '@muzika/core';
import {Observable} from 'rxjs/internal/Observable';
import {IMuzikaPaperContract} from '../../../../../../core/src/contracts/interface/MuzikaPaperContract';
import {CommunityPostsMock, SheetPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {AlertService} from '../../../alert/alert.service';

@Component({
  selector: 'app-post-community-item-detail',
  templateUrl: './community/post-community-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './community/post-community-item-detail.component.scss']
})
export class PostCommunityItemDetailComponent {
  post: CommunityPost = CommunityPostsMock[0];
}

@Component({
  selector: 'app-post-sheet-item-detail',
  templateUrl: './sheet/post-sheet-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './sheet/post-sheet-item-detail.component.scss']
})
export class PostSheetItemDetailComponent extends BaseComponent {
  post: SheetPost = SheetPostsMock[0];
  paper: IMuzikaPaperContract;
  isPurchased = false;

  @select(['user', 'currentUser'])
  currentUserObs: Observable<User>;
  currentUser: User;

  constructor(private muzikaPaper: MuzikaPaperContract,
              private muzikaCoin: MuzikaCoin,
              private alertService: AlertService) {
    super();
  }

  ngOnInit() {
    this.paper = this.muzikaPaper.at(this.post.contract_address);

    this._sub.push(
      this.currentUserObs.subscribe(async user => {
        this.currentUser = user;

        if (user) {
          this.isPurchased = await this.paper.isPurchased(user.address);
          this.post.price = unitUp(await this.paper.price());
          console.log(user.address, this.isPurchased);
        }
      })
    );
  }

  purchase() {
    this.alertService.confirm('Are you sure to purchase this music?', () => {
      this._purchase();
    });
  }

  private async _purchase() {
    const coin = await this.muzikaCoin.deployed();

    try {
      const estimateGas = await coin.increaseApprovalAndCall.estimateGas(
        this.post.contract_address,
        unitDown(this.post.price),
        '0x',
        {from: this.currentUser.address}
      );
      await coin.increaseApprovalAndCall(
        this.post.contract_address,
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

