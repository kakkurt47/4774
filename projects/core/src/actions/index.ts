import {Action} from 'redux';

export * from './user.action';
export * from './comment.action';
export * from './post.action';

export interface PayloadAction<T = any> extends Action {
  payload: T;
}
