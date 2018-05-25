import {NgRedux} from '@angular-redux/store';
import {Injectable} from '@angular/core';
import {User} from '@muzika/core';
import {Observable} from 'rxjs';
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

  refreshMe(): Observable<User> {
    return this.apiConfig.get<User>('/me').pipe(
      map(user => {
        this.store.dispatch({
          type: UserActions.SET_CURRENT_USER,
          user: user
        });

        return user;
      })
    );
  }

  register(address: string, message: string, signature: string, user_name: string): Observable<string> {
    return this.apiConfig.post<string>(`/register`, {address, message, signature, user_name}).pipe(
      map(token => {
        if (token) {
          this.localStorage.setItem('token', token);
          this.refreshMe().subscribe(); // @TODO switchMap would be better
        }

        return token;
      })
    );
  }

  login(address: string, message: string, signature: string): Observable<string> {
    return this.apiConfig.post<string>(`/login`, {address, message, signature}).pipe(
      map(token => {
        if (token) {
          this.localStorage.setItem('token', token);
          this.refreshMe().subscribe(); // @TODO switchMap would be better
        }

        return token;
      })
    );
  }
}
