import { combineReducers, Reducer } from 'redux';
import { CommentReducer, CommentState } from './comments.reducer';
import { PostReducer, PostState } from './post.reducer';
import { UserReducer, UserState } from './user.reducer';

export * from './user.reducer';
export * from './post.reducer';
export * from './comments.reducer';

export interface IAppState {
  post: PostState;
  comment: CommentState;
  user: UserState;
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  post: PostReducer,
  comment: CommentReducer,
  user: UserReducer
});
