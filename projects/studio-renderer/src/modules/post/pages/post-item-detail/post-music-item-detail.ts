import { BaseComponent, IMuzikaPaperContract, MuzikaCoin, MuzikaPaperContract, PostActions, UserActions } from '@muzika/core/angular';
import { Injector } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { IAppState, MusicPost, unitUp, User } from '@muzika/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';


export class AbstractPostMusicItemDetail extends BaseComponent {
  paper: IMuzikaPaperContract;
  isPurchased = false;

  currentUser: User;

  postSub: Subscription;
  post: MusicPost;

  private _route: ActivatedRoute;
  private _muzikaPaper: MuzikaPaperContract;
  private _muzikaCoin: MuzikaCoin;
  private _postActions: PostActions;
  private _store: NgRedux<IAppState>;

  constructor(private boardType: string,
              injector: Injector) {
    super();
    this._route = injector.get<ActivatedRoute>(ActivatedRoute);
    this._muzikaPaper = injector.get<MuzikaPaperContract>(MuzikaPaperContract);
    this._muzikaCoin = injector.get<MuzikaCoin>(MuzikaCoin);
    this._postActions = injector.get<PostActions>(PostActions);
    this._store = injector.get(NgRedux);
  }

  ngOnInit() {
    super.ngOnInit();


    this._sub.push(
      UserActions.currentUserObs.subscribe(async user => {
        this.currentUser = user;
      })
    );

    this._sub.push(
      this._route.params.subscribe(params => {
        const postId = params['id'];

        if (this.postSub) {
          this.postSub.unsubscribe();
        }

        this.postSub = combineLatest(
          this._store.select<MusicPost>(['post', 'post', 'music', postId]),
          UserActions.currentUserObs
        ).subscribe(async ([post, user]) => {
          this.post = post;
          this.paper = this._muzikaPaper.at(post.music_contract.contract_address);

          if (user) {
            this.isPurchased = await this.paper.isPurchased(user.address);
            this.post.price = unitUp(await this.paper.price());
          }
        });

        this._postActions.loadPost(this.boardType, postId);
      })
    );
  }
}
