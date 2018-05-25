import {Component} from '@angular/core';
import {FreePost, MusicPost, VideoPost} from '@muzika/core';
import {FreePostsMock, MusicPostsMock, VideoPostsMock} from '../../../../mock/posts';

@Component({
  selector: 'app-post-free-item-detail',
  templateUrl: './free/post-free-item-detail.component.html',
  styleUrls: ['./free/post-free-item-detail.component.scss']
})
export class PostFreeItemDetailComponent {
  post: FreePost = FreePostsMock[0];
}

@Component({
  selector: 'app-post-music-item-detail',
  templateUrl: './music/post-music-item-detail.component.html',
  styleUrls: ['./music/post-music-item-detail.component.scss']
})
export class PostMusicItemDetailComponent {
  post: MusicPost = MusicPostsMock[0];
}
@Component({
  selector: 'app-post-video-item-detail',
  templateUrl: './video/post-video-item-detail.component.html',
  styleUrls: ['./video/post-video-item-detail.component.scss']
})
export class PostVideoItemDetailComponent {
  post: VideoPost = VideoPostsMock[0];
}

