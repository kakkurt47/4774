import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import { CommunityPost, PaginationResult, MusicPost, VideoPost, MuzikaConsole } from '@muzika/core';
import {BaseComponent, PostActions} from '@muzika/core/angular';
import {Observable} from 'rxjs';
import {CommunityPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {CommunityTagsMock, VideoTagsMock} from '../../../../mock/tags';
import {SheetMusicGenreSelections} from '../../post.constant';

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
  selector: 'app-post-list-music',
  templateUrl: './music/post-music.component.html',
  styleUrls: ['./post-list.scss', './music/post-music.component.scss']
})
export class PostMusicListComponent extends BaseComponent {
  tags: { name: string, value: string }[] = SheetMusicGenreSelections;

  @select(['post', 'posts', 'music'])
  postsObs: Observable<PaginationResult<MusicPost>>;
  posts: PaginationResult<MusicPost>;

  constructor(private postActions: PostActions) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.postsObs.subscribe(posts => {
        this.posts = posts;
        MuzikaConsole.log(posts);
      })
    );

    this.loadPosts(1);
  }

  loadPosts(page?: string | number) {
    this.postActions.loadPosts('music', page.toString(), {});
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
