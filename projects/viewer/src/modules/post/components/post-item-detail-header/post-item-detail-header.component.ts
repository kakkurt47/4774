import {Component, Input} from '@angular/core';
import {BasePost} from '@muzika/core';

@Component({
  selector: 'app-post-item-detail-header',
  templateUrl: './post-item-detail-header.component.html',
  styleUrls: ['./post-item-detail-header.component.scss']
})
export class PostItemDetailHeaderComponent {
  @Input()
  post: BasePost;
}
