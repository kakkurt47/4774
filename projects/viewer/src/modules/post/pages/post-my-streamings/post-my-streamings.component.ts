import { Component } from '@angular/core';
import { BaseComponent, PostActions } from '@muzika/core/angular';

@Component({
  selector: 'post-my-streaming',
  templateUrl: './post-my-streamings.component.html'
})
export class PostMyStreamingsComponent extends BaseComponent {
  constructor(private postActions: PostActions) {
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
  }

  changePage(page: number) {
    this.postActions.loadMyPosts('music', `${page}`, {
      type: 'streaming'
    });
  }
}
