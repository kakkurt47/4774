import {Component} from '@angular/core';
import {FreePost, MusicPost, Tag, VideoPost} from '@muzika/core';
import {FreePostsMock, MusicPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {FreeTagsMock, MusicTagsMock, VideoTagsMock} from '../../../../mock/tags';

@Component({
  selector: 'app-post-list-free',
  templateUrl: './free/post-free.component.html',
  styleUrls: ['./post-list.scss', './free/post-free.component.scss']
})
export class PostFreeListComponent {
  tags: Tag[] = FreeTagsMock;
  posts: FreePost[] = FreePostsMock;
}


@Component({
  selector: 'app-post-list-music',
  templateUrl: './music/post-music.component.html',
  styleUrls: ['./post-list.scss', './music/post-music.component.html']
})
export class PostMusicListComponent {
  tags: Tag[] = MusicTagsMock;
  posts: MusicPost[] = MusicPostsMock;
}

@Component({
  selector: 'app-post-list-video',
  templateUrl: './video/post-video.component.html',
  styleUrls: ['./post-list.scss', './video/post-video.component.html']
})
export class PostVideoListComponent {
  tags: Tag[] = VideoTagsMock;
  posts: VideoPost[] = VideoPostsMock;
}
