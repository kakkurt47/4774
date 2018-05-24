import {Action} from 'redux';

export * from './user.action';

export interface PayloadAction<T = any> extends Action {
  payload: T;
}
