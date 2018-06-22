import { Component } from '@angular/core';
import { BaseComponent, UserActions } from '@muzika/core/angular';
import { MusicPost, PaginationResult } from '@muzika/core';


@Component({
  selector: 'post-my-sheets',
  templateUrl: './post-my-sheets.component.html'
})
export class PostMySheetsComponent extends BaseComponent {
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
      UserActions.mySheetPostsObs
        .subscribe(posts => {
          this.posts = posts;
        })
    );

    this.changePage(1);
  }

  changePage(page: number) {
    this.userActions.loadMyPosts('sheet', `${page}`).subscribe();
  }
}

