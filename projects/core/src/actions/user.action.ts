import {NgRedux} from '@angular-redux/store';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APIConfig} from '../config';
import {IAppState} from '../reducers';

@Injectable()
export class UserActions {
  static SET_CURRENT_USER = '[user][SET_CURRENT_USER]';

  constructor(private store: NgRedux<IAppState>,
              private apiConfig: APIConfig) {
  }
}
