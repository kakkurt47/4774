import {NgRedux} from '@angular-redux/store';
import {Component, ElementRef, Inject, Input, NgZone, PLATFORM_ID} from '@angular/core';
import {IAppState, AbstractPostCommentComponent, CommentActions, PostActions} from '@muzika/core';

@Component({
  selector: 'muzika-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent extends AbstractPostCommentComponent {
  @Input()
  boardType: string;
  @Input()
  boardID: number;
  @Input()
  activeCommentID: string | null;

  constructor(protected commentAction: CommentActions,
              protected postActions: PostActions,
              protected store: NgRedux<IAppState>,
              @Inject(PLATFORM_ID) protected platformId,
              protected element: ElementRef,
              protected zone: NgZone) {
    super(commentAction, postActions, store, platformId, element, zone);
  }
}
