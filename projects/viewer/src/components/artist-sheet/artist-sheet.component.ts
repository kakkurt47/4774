import {Component, Input} from '@angular/core';
import {SheetPost} from '@muzika/core';

@Component({
  selector: 'app-artist-sheet',
  templateUrl: './artist-sheet.component.html',
  styleUrls: ['./artist-sheet.component.scss']
})
export class ArtistSheetComponent {
  @Input() sheet: SheetPost;
}
