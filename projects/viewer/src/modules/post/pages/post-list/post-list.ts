import {Component} from '@angular/core';
import {CommunityPost, SheetPost, VideoPost} from '@muzika/core';
import {CommunityPostsMock, SheetPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {CommunityTagsMock, SheetTagsMock, VideoTagsMock} from '../../../../mock/tags';

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
  styleUrls: ['./post-list.scss', './sheet/post-sheet.component.html']
})
export class PostSheetListComponent {
  tags: string[] = SheetTagsMock;
  posts: SheetPost[] = SheetPostsMock;
}

@Component({
  selector: 'app-post-list-video',
  templateUrl: './video/post-video.component.html',
  styleUrls: ['./post-list.scss', './video/post-video.component.html']
})
export class PostVideoListComponent {
  tags: string[] = VideoTagsMock;
  posts: VideoPost[] = VideoPostsMock;
}
