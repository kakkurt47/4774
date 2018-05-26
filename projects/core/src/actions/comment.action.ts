import {NgRedux} from '@angular-redux/store';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {APIConfig} from '../config/api.config';
import {ParamsBuilder} from '../config/params.builder';
import {PostComment} from '../models/comment';
import {PaginationResult} from '../models/pagination';
import {IAppState} from '../reducers/index';
import {UserActions} from './user.action';

@Injectable()
export class CommentActions {

  public static SET_COMMENTS_RESULT = '[comments] SET COMMENT LIST';

  constructor(private store: NgRedux<IAppState>,
              private userAction: UserActions,
              private apiConfig: APIConfig) {
  }

  /** @experimental */
  getComments(boardType, boardID, currentPage) {
    const params = ParamsBuilder.from({
      boardType, boardID, currentPage
    });
    this.apiConfig
      .get<PaginationResult<PostComment>>(`/board/${boardType}/${boardID}/comment`, {params})
      .subscribe(result => {
        this.store.dispatch({
          type: CommentActions.SET_COMMENTS_RESULT,
          payload: {
            boardType, boardID, result
          }
        });
      });
  }

  like(boardType: string, commentID: number): Observable<any> {
    return this.apiConfig.post<any>(`/board/${boardType}/comment/${commentID}/like`, {})
      .pipe(
        map(data => {
          if (data.status === 'success') {
            // this.userAction.loadCommentLikes();
            // @TODO loadCommentLikes 구성하기
          }
          return data;
        })
      );
  }

  write(boardType: string, boardID: number, parent_comment_id: number, content: string): Observable<any> {
    return this.apiConfig.post(`/board/${boardType}/${boardID}/comment`, {
      parent_comment_id, content
    });
  }

  remove(boardType: string, commentID: number): Observable<any> {
    return this.apiConfig.delete(`/board/${boardType}/comment/${commentID}`);
  }

  modify(boardType: string, commentID: number, content: string): Observable<any> {
    return this.apiConfig.put(`/board/${boardType}/comment/${commentID}`, {
      content
    });
  }
}
