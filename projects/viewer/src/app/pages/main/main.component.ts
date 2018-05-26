import {Component} from '@angular/core';
import {BaseComponent, CommunityPost, SheetPost} from '@muzika/core';
import {BestPostsMock, SheetPostsMock} from '../../../mock/posts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  sheets: SheetPost[] = SheetPostsMock.slice(0, 5);
  posts: CommunityPost[] = BestPostsMock;

  topSheets: SheetPost[];

  constructor() {
    super();
    this.topSheets = this.sheets.slice(0, 3);
  }
}
