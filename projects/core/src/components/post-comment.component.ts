import {NgRedux} from '@angular-redux/store';
import {isPlatformBrowser} from '@angular/common';
import {ElementRef, NgZone, OnChanges, SimpleChanges} from '@angular/core';
import {Observable, combineLatest, Subscription} from 'rxjs';
import {CommentActions} from '../actions/comment.action';
import {PostActions} from '../actions/post.action';
import {AlertifyInstnace} from '../services/alertify-instance';
import {PostComment} from '../models/comment';
import {PaginationResult} from '../models/pagination';
import {User} from '../models/user';
import {IAppState} from '../reducers/index';
import {BaseComponent} from './base.component';

export abstract class AbstractPostCommentComponent extends BaseComponent implements OnChanges {
  boardType: string;
  boardID: number;
  activeCommentID: string | null;

  commentResult: PaginationResult<PostComment>;

  currentUserObs: Observable<User>;
  currentUser: User;

  replyShow: { [key: number]: boolean };
  modifyShow: { [key: number]: any };
  replyContent: { [key: number]: string };
  writtenContent: string;

  _commentSub: Subscription;
  currentCommentPage: number;

  constructor(protected commentAction: CommentActions,
              protected postActions: PostActions,
              protected store: NgRedux<IAppState>,
              protected platformId: any,
              protected element: ElementRef,
              protected zone: NgZone) {
    super();
    this.currentUserObs = this.store.select(state => state.user.currentUser);
  }

  ngOnInit() {
    super.ngOnInit();
    this.writtenContent = '';
    this.replyShow = {};
    this.modifyShow = {};
    this.replyContent = {};

    this._sub.push(
      this.currentUserObs.subscribe((user: User) => {
        this.currentUser = user;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let is_changed = false;
    for (const propName in changes) {
      const chng = changes[propName];
      if ((propName === 'boardID' || propName === 'boardType') && chng.currentValue !== chng.previousValue) {
        is_changed = true;
      }
    }
    if (is_changed) {
      this.setCommentSub();
    }
  }

  ngOnDestroy(): void {
    if (this._commentSub) {
      this._commentSub.unsubscribe();
    }
    super.ngOnDestroy();
  }

  loadComments(page = 0) {
    let pageQuery: string;
    if (!this.activeCommentID) {
      pageQuery = 'page-';
      if (page === 0) {
        pageQuery += this.currentCommentPage;
      } else {
        pageQuery += this.currentCommentPage = page;
      }
    } else {
      pageQuery = `comment-${this.activeCommentID}`;
    }
    this.commentAction.getComments(this.boardType, this.boardID, pageQuery);
  }

  setCommentSub() {
    if (!this.boardType || !this.boardID) {
      return;
    }
    if (this._commentSub) {
      this._commentSub.unsubscribe();
    }

    this._commentSub = combineLatest<PaginationResult<PostComment>, number[]>(
      this.store.select(['comment', this.boardType, this.boardID]),
      this.store.select(['users', 'commentLikes', this.boardType])
    ).subscribe(([commentResult, commentLikes]) => {
      if (!!commentResult) {
        commentResult.list = commentResult.list.map(comment => {
          comment.my_like = (commentLikes.indexOf(comment.comment_id) !== -1);
          if (comment.reply_cnt > 0) {
            comment.reply_list = comment.reply_list.map(reply => {
              reply.my_like = (commentLikes.indexOf(reply.comment_id) !== -1);
              return reply;
            });
          }
          return comment;
        });
        if (!this.commentResult) { // 최초로 comments 렌더링 할 때
          this.commentResult = commentResult;
          this.goToActiveComment();
        } else {
          this.commentResult = commentResult;
        }
      }
    });

    this.loadComments(1);
  }

  goToActiveComment() {
    if (isPlatformBrowser(this.platformId) &&
      !!this.activeCommentID &&
      this.commentResult &&
      this.commentResult.list.length > 0) {

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {

          const commentElem = this.element.nativeElement.querySelector('#comment-section-' + this.activeCommentID);
          console.log(commentElem);
          if (commentElem) {
            commentElem.scrollIntoView(true);
            commentElem.classList.add('active');
          }

          this.activeCommentID = null;
        }, 300);
      });
    }
  }

  like(comment: PostComment) {
    this.commentAction.like(this.boardType, comment.comment_id)
      .subscribe(data => {
        if (data.result !== 'success') {
          AlertifyInstnace.alert(data.msg);
        } else {
          this.loadComments();
        }
      });
  }

  violation(commentID) {
    // this.alertService.openDialogConfirmMessage({
    //   title: '신고',
    //   content: '올바른 신고 시 감사의 의미로 포인트 지급되며, 허위 신고 시 일정 기간동안 신고 불가능합니다.',
    //   confirmMessage: '신고하기',
    //   cancelMessage: '취소하기',
    //   placeholder: '신고 사유를 입력해주세요.'
    // }).subscribe(message => {
    //   if (message !== null) {
    //     this.postActions
    //       .violation(this.boardType, this.boardID, commentID, message)
    //       .subscribe(res => {
    //         if (res.result === 'success') {
    //           AlertifyInstnace.alert('성공적으로 접수되었습니다. 2일 내로 의견 반영하겠습니다.');
    //         } else {
    //           AlertifyInstnace.alert(res.msg);
    //         }
    //       });
    //   }
    // });
  }

  write(commentID, content) {
    if (!this.currentUser) {
      AlertifyInstnace.alert('로그인 후 이용 가능합니다.');
      return;
    }

    this.commentAction
      .write(this.boardType, this.boardID, commentID, content)
      .subscribe(res => {
        if (res.result === 'success') {
          if (commentID === null) {
            this.writtenContent = '';
            this.loadComments(1);
          } else {
            this.replyContent[commentID] = '';
            this.replyShow[commentID] = false;
            this.loadComments();
          }
        } else {
          AlertifyInstnace.alert(res.msg);
        }
      }, err => {
        console.log(err);
      });
  }

  remove(commentID) {
    if (!this.currentUser) {
      AlertifyInstnace.alert('로그인 후 이용 가능합니다.');
      return;
    }

    AlertifyInstnace
      .confirm('댓글 삭제', '정말 삭제하시겠습니까? \n 삭제 시 복구 불가능합니다.',
        () => {
          this.commentAction.remove(this.boardType, commentID)
            .subscribe(res => {
              AlertifyInstnace.alert(res.msg);
              if (res.result === 'success') {
                this.loadComments();
              }
            });
        }
      );
  }

  modify(comment: PostComment) {
    if (!this.modifyShow[comment.comment_id]) {
      this.modifyShow[comment.comment_id] = comment.content.split('<br />').join('\n');
    } else {
      AlertifyInstnace
        .confirm('댓글 수정', '수정하신 정보가 모두 사라집니다. \n 계속하시겠습니까?', () => {
          delete this.modifyShow[comment.comment_id];
        });
    }
  }

  modifyApply(commentID: number, content) {
    if (this.modifyShow[commentID]) {
      this.commentAction.modify(this.boardType, commentID, content)
        .subscribe(res => {
          AlertifyInstnace.alert(res.msg);

          if (res.result === 'success') {
            this.loadComments();

            delete this.modifyShow[commentID];
          }
        });
    }
  }
}
