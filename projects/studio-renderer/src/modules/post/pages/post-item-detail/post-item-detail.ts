import { Component } from '@angular/core';
import { CommunityPost, VideoPost } from '@muzika/core';
import { CommunityPostsMock, VideoPostsMock } from '../../../../mock/posts';

@Component({
  selector: 'app-post-community-item-detail',
  templateUrl: './community/post-community-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './community/post-community-item-detail.component.scss']
})
export class PostCommunityItemDetailComponent {
  post: CommunityPost = CommunityPostsMock[0];
}

@Component({
  selector: 'app-post-video-item-detail',
  templateUrl: './video/post-video-item-detail.component.html',
  styleUrls: ['./post-item-detail.scss', './video/post-video-item-detail.component.scss']
})
export class PostVideoItemDetailComponent {
  post: VideoPost = VideoPostsMock[0];
}

