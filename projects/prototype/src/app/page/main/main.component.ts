import {Component} from '@angular/core';
import {BaseComponent, Artist, FreePost, MusicPost} from '@muzika/core';
import * as _alertify from 'alertify.js';
import {ArtistsMock} from '../../../mock/artists';
import {BestPostsMock, MusicPostsMock} from '../../../mock/posts';

const alertify = _alertify.okBtn('확인').cancelBtn('취소');

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  artists: Artist[] = ArtistsMock;
  sheets: MusicPost[] = MusicPostsMock.slice(0, 5);
  posts: FreePost[] = BestPostsMock;

  topSheets: MusicPost[];

  constructor() {
    super();
    this.topSheets = this.sheets.slice(0, 3);
  }
}
