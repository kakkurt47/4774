import {Component} from '@angular/core';
import {FroalaEditorOptions} from '../../post.constant';

@Component({
  selector: 'app-post-community-write',
  templateUrl: './community/post-community-write.component.html',
  styleUrls: ['./post-write.scss', './community/post-community-write.component.scss']
})
export class PostCommunityWriteComponent {
  description: string;
  options = FroalaEditorOptions;
}

@Component({
  selector: 'app-post-sheet-write',
  templateUrl: './sheet/post-sheet-write.component.html',
  styleUrls: ['./post-write.scss', './sheet/post-sheet-write.component.scss']
})
export class PostSheetWriteComponent {

}

@Component({
  selector: 'app-post-video-write',
  templateUrl: './video/post-video-write.component.html',
  styleUrls: ['./post-write.scss', './video/post-video-write.component.scss']
})
export class PostVideoWriteComponent {

}
