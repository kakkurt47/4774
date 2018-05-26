import {Component} from '@angular/core';
import {FroalaEditorOptions} from '../../post.constant';

@Component({
  selector: 'app-post-free-write',
  templateUrl: './free/post-free-write.component.html',
  styleUrls: ['./post-write.scss', './free/post-free-write.component.scss']
})
export class PostFreeWriteComponent {
  description: string;
  options = FroalaEditorOptions;
}

@Component({
  selector: 'app-post-music-write',
  templateUrl: './music/post-music-write.component.html',
  styleUrls: ['./post-write.scss', './music/post-music-write.component.scss']
})
export class PostMusicWriteComponent {

}

@Component({
  selector: 'app-post-video-write',
  templateUrl: './video/post-video-write.component.html',
  styleUrls: ['./post-write.scss', './video/post-video-write.component.scss']
})
export class PostVideoWriteComponent {

}
