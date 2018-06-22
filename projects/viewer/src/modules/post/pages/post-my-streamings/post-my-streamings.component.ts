import { Component } from '@angular/core';
import { BaseComponent, UserActions } from '@muzika/core/angular';
import { MusicPost, PaginationResult } from '@muzika/core';

@Component({
  selector: 'post-my-streaming',
  templateUrl: './post-my-streamings.component.html'
})
export class PostMyStreamingsComponent extends BaseComponent {
  posts: PaginationResult<MusicPost>;

  constructor(private userActions: UserActions) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    // this._sub.push(
    //   PostActions.myPostsObs('sheet')
    //     .subscribe()
    // )
    //
    // this._sub.push(
    //   this.postActions.loadMyPosts('music', '1', {
    //     type: 'sheet'
    //   }).subscribe(posts => {
    //
    //   })
    // );
    this._sub.push(
      UserActions.myStreamingPostsObs
        .subscribe(posts => {
          this.posts = posts;
        })
    );

    this.changePage(1);
  }

  changePage(page: number) {
    this.userActions.loadMyPosts('streaming', `${page}`).subscribe();
  }
}
