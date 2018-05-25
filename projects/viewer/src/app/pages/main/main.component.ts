import {Component} from '@angular/core';
import {BaseComponent, FreePost, MusicPost} from '@muzika/core';
import {BestPostsMock, MusicPostsMock} from '../../../mock/posts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  sheets: MusicPost[] = MusicPostsMock.slice(0, 5);
  posts: FreePost[] = BestPostsMock;

  topSheets: MusicPost[];

  constructor() {
    super();
    this.topSheets = this.sheets.slice(0, 3);
  }
}
