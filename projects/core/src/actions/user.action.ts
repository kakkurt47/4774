import {NgRedux} from '@angular-redux/store';
import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {concatMap, tap} from 'rxjs/internal/operators';
import {map} from 'rxjs/operators';
import {APIConfig} from '../config';
import {User} from '../models/user';
import {IAppState} from '../reducers';
import {LocalStorage} from '../services';
import {promisify} from '../utils';
import {ExtendedWeb3} from '../web3.provider';
import {MuzikaWeb3Service} from '../web3.service';

@Injectable()
export class UserActions {
  static SET_CURRENT_USER = '[user][SET_CURRENT_USER]';

  constructor(private store: NgRedux<IAppState>,
              private apiConfig: APIConfig,
              private web3: ExtendedWeb3,
              private web3Service: MuzikaWeb3Service,
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

  login(address: string): Observable<User> {
    const messagePrefix = `Login to Muzika!\nSignature: `;
    return this.getLoginMessage(address).pipe(
      concatMap((message) => {
        return from(promisify(
          this.web3.personal.sign,
          this.web3.toHex(messagePrefix + message),
          address
        )).pipe(
          map(signature => ({message, signature}))
        );
      }),
      concatMap(({message, signature}) => {
        return this.apiConfig.post<string>(`/login`, {address, message, signature}).pipe(
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
}
