import {NgRedux} from '@angular-redux/store';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '@muzika/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {APIConfig} from '../config';
import {IAppState} from '../reducers';
import {LocalStorage} from '../services';

@Injectable()
export class UserActions {
  static SET_CURRENT_USER = '[user][SET_CURRENT_USER]';

  constructor(private store: NgRedux<IAppState>,
              private apiConfig: APIConfig,
              private localStorage: LocalStorage) {
  }

  getLoginMessage(address: string): Observable<string> {
    return this.apiConfig.get(`/user/${address}`);
  }

  login(address: string, message: string, signature: string): Observable<User> {
    return this.apiConfig.post<User>(`/login`, {address, message, signature}).pipe(
      map(user => {
        if (user) {
          this.localStorage.setItem('token', user.jwt);
        }

        this.store.dispatch({
          type: UserActions.SET_CURRENT_USER,
          user: user
        });

        return user;
      })
    );
  }
}
