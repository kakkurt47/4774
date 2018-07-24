import {Component, Input} from '@angular/core';
import {MusicPost} from '@muzika/core';

@Component({
  selector: 'app-artist-music',
  templateUrl: './artist-music.component.html',
  styleUrls: ['./artist-music.component.scss']
})
export class ArtistMusicComponent {
  @Input() music: MusicPost;
}
