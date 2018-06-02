import {NgRedux} from '@angular-redux/store';
import {Injectable, Inject} from '@angular/core';
import {Observable, from} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';
import {APIConfig} from '../config';
import {PLATFORM_TYPE_TOKEN, MuzikaPlatformType} from '../config/platform';
import {User} from '../models/user';
import {IAppState} from '../reducers';
import {LocalStorage} from '../services';
import {promisify} from '../utils';
import {ExtendedWeb3} from '../web3.provider';
import {MuzikaWeb3Service} from '../web3.service';

@Injectable()
export class UserActions {
  static SET_CURRENT_USER = '[user][SET_CURRENT_USER]';
  static SET_BOARD_LIKES = '[user] SET_BOARD_LIKES';
  static SET_COMMENT_LIKES = '[user] SET_COMMENT_LIKES';

  constructor(private store: NgRedux<IAppState>,
              private apiConfig: APIConfig,
              private web3: ExtendedWeb3,
              private web3Service: MuzikaWeb3Service,
              private localStorage: LocalStorage,
              @Inject(PLATFORM_TYPE_TOKEN) private platformType: MuzikaPlatformType) {
  }

  getLoginMessage(address: string): Observable<string> {
    return this.apiConfig.get(`/user/${address}/sign-message`);
  }

  loadBoardLikes(boardType: string) {
    if (!this.store.getState().user.currentUser) {
      return;
    }
    const userID = this.store.getState().user.currentUser.user_id;
    this.apiConfig.get<any>(`/user/${userID}/board/${boardType}/like`)
      .subscribe(likes => {
        this.store.dispatch({
          type: UserActions.SET_BOARD_LIKES,
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
          type: UserActions.SET_COMMENT_LIKES,
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
          type: UserActions.SET_CURRENT_USER,
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
    return this.getLoginMessage(address).pipe(
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
      type: UserActions.SET_CURRENT_USER,
      payload: null
    });
    /*
    // 게시글 좋아요 목록 리셋
    this.store.dispatch({
      type: UserActions.SET_BOARD_LIKES,
      likes: {free: [], video: [], music: []}
    });
    // 댓글 좋아요 목록 리셋
    this.store.dispatch({
      type: UserActions.SET_COMMENT_LIKES,
      likes: {free: [], video: [], music: []}
    });
    */
  }

}
