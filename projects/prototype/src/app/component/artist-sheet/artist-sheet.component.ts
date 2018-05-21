import {Component, Input} from '@angular/core';
import {SheetMusic} from '../../models/sheet-music';

@Component({
  selector: 'app-artist-sheet',
  templateUrl: './artist-sheet.component.html',
  styleUrls: ['./artist-sheet.component.scss']
})
export class ArtistSheetComponent {
  @Input() sheet: SheetMusic;
}