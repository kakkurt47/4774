import {Component, Input} from '@angular/core';
import {MusicPost} from '@muzika/core';

@Component({
  selector: 'app-post-music, [app-post-music]',
  templateUrl: './post-music.component.html',
  styleUrls: ['./post-music.component.scss']
})
export class PostMusicComponent {
  @Input() music: MusicPost;
}
