import {Component} from '@angular/core';
import {CommunityPost, SheetPost, Tag, VideoPost} from '@muzika/core';
import {CommunityPostsMock, SheetPostsMock, VideoPostsMock} from '../../../../mock/posts';
import {CommunityTagsMock, SheetTagsMock, VideoTagsMock} from '../../../../mock/tags';

@Component({
  selector: 'app-post-list-community',
  templateUrl: './community/post-community.component.html',
  styleUrls: ['./post-list.scss', './community/post-community.component.scss']
})
export class PostCommunityListComponent {
  tags: Tag[] = CommunityTagsMock;
  posts: CommunityPost[] = CommunityPostsMock;
}


@Component({
  selector: 'app-post-list-sheet',
  templateUrl: './sheet/post-sheet.component.html',
  styleUrls: ['./post-list.scss', './sheet/post-sheet.component.html']
})
export class PostSheetListComponent {
  tags: Tag[] = SheetTagsMock;
  posts: SheetPost[] = SheetPostsMock;
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
