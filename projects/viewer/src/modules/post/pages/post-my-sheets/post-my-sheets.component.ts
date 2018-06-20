import { Component } from '@angular/core';
import { BaseComponent, PostActions } from '@muzika/core/angular';


@Component({
  selector: 'post-my-sheets',
  templateUrl: './post-my-sheets.component.html'
})
export class PostMySheetsComponent extends BaseComponent {
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
}

