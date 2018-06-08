import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, CommunityPost, PaginationResult, PostActions, SheetPost, VideoPost} from '@muzika/core';
import {Observable} from 'rxjs';
import {CommunityPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {CommunityTagsMock, VideoTagsMock} from '../../../../mock/tags';
import {GenreSelections} from '../../post.constant';

@Component({
  selector: 'app-post-list-community',
  templateUrl: './community/post-community.component.html',
  styleUrls: ['./post-list.scss', './community/post-community.component.scss']
})
export class PostCommunityListComponent {
  tags: string[] = CommunityTagsMock;
  posts: CommunityPost[] = CommunityPostsMock;
}


@Component({
  selector: 'app-post-list-sheet',
  templateUrl: './sheet/post-sheet.component.html',
  styleUrls: ['./post-list.scss', './sheet/post-sheet.component.scss']
})
export class PostSheetListComponent extends BaseComponent {
  tags: { name: string, value: string }[] = GenreSelections;

  @select(['post', 'posts', 'sheet'])
  postsObs: Observable<PaginationResult<SheetPost>>;
  posts: PaginationResult<SheetPost>;

  constructor(private postActions: PostActions) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.postsObs.subscribe(posts => {
        this.posts = posts;
        console.log(posts);
      })
    );

    this.loadPosts(1);
  }

  loadPosts(page?: string | number) {
    this.postActions.loadPosts('sheet', page.toString(), {});
  }
}

@Component({
  selector: 'app-post-list-video',
  templateUrl: './video/post-video.component.html',
  styleUrls: ['./post-list.scss', './video/post-video.component.scss']
})
export class PostVideoListComponent {
  tags: string[] = VideoTagsMock;
  posts: VideoPost[] = VideoPostsMock;
}
