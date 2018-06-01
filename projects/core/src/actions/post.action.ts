import {NgRedux} from '@angular-redux/store';
import {isPlatformBrowser} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {APIConfig, ParamsBuilder} from '../config';
import {BasePost, InfPaginationResult, PaginationResult, PostRef} from '../models';
import {IAppState} from '../reducers';
import {UserActions} from './user.action';

@Injectable()
export class PostActions {
  static INSERT_POSTS_LIST = '[posts] Insert posts list';
  static INSERT_POSTS_BEFORE_LIST = '[posts] Insert posts into bottom of list';
  static INSERT_POSTS_AFTER_LIST = '[posts] Insert posts into top of list';
  static RESET_POSTS = '[posts] Reset list';
  static RESET_INF_POSTS = '[posts] Reset inf list';
  static LIKE_TOGGLE_POST = '[posts] like toggle post';
  static SAVE_POSTS = '[posts] save posts';
  static SAVE_POST_ADDITION = '[posts] save post additional info';

  constructor(private store: NgRedux<IAppState>,
              private apiConfig: APIConfig,
              private userActions: UserActions,
              @Inject(PLATFORM_ID) private platformId) {
  }
  write(boardType, post): Observable<any> {
    return this.apiConfig.post(`/board/${boardType}`, post);
  }

  loadPost(boardType, boardID) {
    this.apiConfig.get<BasePost>(`/post/${boardType}/${boardID}`)
      .subscribe(
        (post) => {
          this.savePost(boardType, post);
          this.visit(boardType, +boardID);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        });
  }

  visit(boardType: string, boardID: number) {
    if (isPlatformBrowser(this.platformId)) { // Server side rendering에서는 업데이트 안함
      this.apiConfig
        .post('board/row/update', {
          boardType, boardID
        }).subscribe();
    }
  }

  like(boardType: string, boardID: number, diff: number): Observable<any> {
    return this.apiConfig.post<any>(`/board/${boardType}/${boardID}/like`, {})
      .pipe(
        map(data => {
          if (data.status === 'success') {
            this.userActions.loadBoardLikes(boardType);
            this.store.dispatch({
              type: PostActions.LIKE_TOGGLE_POST,
              boardType, diff, boardID
            });
          }
          return data;
        })
      );
  }

  remove(boardType: string, boardID: number) {
    return this.apiConfig.delete(`/board/${boardType}/${boardID}`);
  }

  violation(boardType, boardID, commentID, reason: string) {
    // return this.http
    //   .post<any>(this.apiConfig.legacy_api_url, {
    //     mode: 'violationRequest',
    //     boardType: boardType,
    //     boardID: boardID,
    //     commentID: commentID,
    //     reason: reason
    //   })
    //   .pipe(map((res: any) => res.request));
  }

  resetPosts(boardType: string) {
    this.store.dispatch({
      type: PostActions.RESET_POSTS,
      payload: {boardType}
    });
  }

  resetInfPosts(boardType: string) {
    this.store.dispatch({
      type: PostActions.RESET_INF_POSTS,
      payload: {boardType}
    });
  }

  loadInfPosts(boardType: string, mode: string, params: Object) {
    const currentPosts: InfPaginationResult<PostRef> = this.store.getState().post.infPosts[boardType];
    if (mode === 'after' && currentPosts.after !== null) {
      params['after'] = currentPosts.after;
    } else if (currentPosts.before !== null) {
      params['before'] = currentPosts.before;
    }
    this.requestPosts(boardType,
      (mode === 'after') ? PostActions.INSERT_POSTS_AFTER_LIST : PostActions.INSERT_POSTS_BEFORE_LIST,
      params);
  }

  loadPosts(boardType: string, page: string, params: Object) {
    params['page'] = page;
    this.requestPosts(boardType, PostActions.INSERT_POSTS_LIST, params);
  }

  savePosts(boardType: string, posts: BasePost[], update_column: string) {
    this.store.dispatch({
      type: PostActions.SAVE_POSTS,
      boardType, posts, update_column
    });
  }

  loadAdditional(boardType: string, boardID: number, is_modify: boolean): Observable<any> {
    return this.apiConfig
      .get(`/post/${boardType}/${boardID}/additional`, {
        params: ParamsBuilder.from({is_modify})
      })
      .pipe(
        map(data => {
          this.store.dispatch({
            type: PostActions.SAVE_POST_ADDITION,
            boardType: boardType,
            boardID: boardID,
            additionalInfo: data
          });
          return data;
        })
      );
  }

  purchase(isFree: number, boardID: number, payType: 'pdf' | 'point' | 'cash') {
    if (isFree === 0) {
      return this.apiConfig.get<any>(`/post/product-buy/${boardID}`, {
        params: ParamsBuilder.from({payType})
      });
    } else {
      return this.apiConfig
        .get<any>(`/post/paper-buy/${boardID}`, {
          params: ParamsBuilder.from({payType})
        });
    }
  }

  private savePost(boardType: string, post: BasePost, update_column = 'all') {
    this.store.dispatch({
      type: PostActions.SAVE_POSTS,
      boardType, update_column,
      posts: [post],
    });
  }

  private requestPosts(boardType: string, dispatchType: string, params: Object) {
    this.apiConfig
      .get<PaginationResult<BasePost> | InfPaginationResult<BasePost>>(`/post/${boardType}`, {
        params: ParamsBuilder.from(params)
      })
      .subscribe((data: any) => {
        data.boardType = boardType;

        // trigger post inserting
        this.store.dispatch({
          type: dispatchType,
          payload: data
        });
      });
  }
}
