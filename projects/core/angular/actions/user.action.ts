import { NgRedux, select } from '@angular-redux/store';
import {Injectable, Inject} from '@angular/core';
import {MuzikaPlatformType, User, IAppState, UserActionType, promisify} from '@muzika/core';
import {Observable, from} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';
import {APIConfig} from '../config/api.config';
import {PLATFORM_TYPE_TOKEN} from '../config/injection.tokens';
import {ExtendedWeb3} from '../providers/extended-web3.provider';
import {LocalStorage} from '../providers/local-storage.service';

@Injectable({providedIn: 'root'})
export class UserActions {
  @select(['user', 'currentUser'])
  public static currentUserObs: Observable<User>;

  constructor(private store: NgRedux<IAppState>,
              private apiConfig: APIConfig,
              private web3: ExtendedWeb3,
              private localStorage: LocalStorage,
              @Inject(PLATFORM_TYPE_TOKEN) private platformType: MuzikaPlatformType) {
  }

  loadBoardLikes(boardType: string) {
    if (!this.store.getState().user.currentUser) {
      return;
    }
    const userID = this.store.getState().user.currentUser.user_id;
    this.apiConfig.get<any>(`/user/${userID}/board/${boardType}/like`)
      .subscribe(likes => {
        this.store.dispatch({
          type: UserActionType.SET_BOARD_LIKES,
          likes, boardType
        });
      });
  }

  loadCommentLikes(boardType) {
    if (!this.store.getState().user.currentUser) {
      return;
    }
    const userID = this.store.getState().user.currentUser.user_id;
    this.apiConfig.get<any>(`/user/${userID}/board/${boardType}/comment/likes`)
      .subscribe(likes => {
        this.store.dispatch({
          type: UserActionType.SET_COMMENT_LIKES,
          payload: {
            likes, boardType
          }
        });
      });
  }

  refreshMe(): Observable<User> {
    return this.apiConfig.get<User>('/me').pipe(
      map(user => {
        this.store.dispatch({
          type: UserActionType.SET_CURRENT_USER,
          payload: user
        });

        return user;
      })
    );
  }

  register(address: string, message: string, signature: string, user_name: string): Observable<User> {
    return this.apiConfig.post<string>(`/register`, {address, message, signature, user_name}).pipe(
      map(token => {
        if (token) {
          this.localStorage.setItem('token', token);
        }

        return token;
      }),
      concatMap(token => this.refreshMe())
    );
  }

  login(address: string): Observable<User> {
    const messagePrefix = `Login to Muzika!\nSignature: `;
    return this.apiConfig.get(`/user/${address}/sign-message`).pipe(
      concatMap((message) => {
        return from(promisify(
          this.web3.personal.sign,
          this.web3.toHex(messagePrefix + message),
          address
        ));
      }),
      concatMap((signature) => {
        return this.apiConfig
          .post<string>(`/login`, {address, signature, platform_type: this.platformType})
          .pipe(
            tap(token => {
              if (token) {
                this.localStorage.setItem('token', token);
              }
            })
          );
      }),
      concatMap(token => this.refreshMe())
    );
  }

  logout() {
    this.localStorage.removeItem('token');
    this.store.dispatch({
      type: UserActionType.SET_CURRENT_USER,
      payload: null
    });
    /*
    // 게시글 좋아요 목록 리셋
    this.store.dispatch({
      type: UserActionType.SET_BOARD_LIKES,
      likes: {free: [], video: [], music: []}
    });
    // 댓글 좋아요 목록 리셋
    this.store.dispatch({
      type: UserActionType.SET_COMMENT_LIKES,
      likes: {free: [], video: [], music: []}
    });
    */
  }

}
