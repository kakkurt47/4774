import {combineReducers, Reducer} from 'redux';
import {CommentState, CommentReducer} from './comments.reducer';
import {PostsState, PostsReducer} from './posts.reducer';
import {UserReducer, UserState} from './user.reducer';

export interface IAppState {
  posts: PostsState;
  comment: CommentState;
  user: UserState;
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  posts: PostsReducer,
  comment: CommentReducer,
  user: UserReducer,
});
