import {Component, Input} from '@angular/core';
import {SheetMusic} from '@muzika/core';

@Component({
  selector: 'app-post-sheet, [app-post-sheet]',
  templateUrl: './post-sheet.component.html',
  styleUrls: ['./post-sheet.component.scss']
})
export class PostSheetComponent {
  @Input() sheet: SheetMusic;
}
