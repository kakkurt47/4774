import {combineReducers, Reducer} from 'redux';
import {CommentState, CommentReducer} from './comments.reducer';
import {PostState, PostReducer} from './post.reducer';
import {UserReducer, UserState} from './user.reducer';

export interface IAppState {
  post: PostState;
  comment: CommentState;
  user: UserState;
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  post: PostReducer,
  comment: CommentReducer,
  user: UserReducer,
});
