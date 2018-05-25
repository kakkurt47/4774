import {Component, Input} from '@angular/core';
import {FreePost} from '@muzika/core';

@Component({
  selector: 'app-post-list-item, [app-post-list-item]',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {
  @Input() post: FreePost;
}
