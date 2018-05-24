import {combineReducers, Reducer} from 'redux';
import {UserReducer, UserState} from './user.reducer';

export interface IAppState {
  user: UserState;
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  user: UserReducer,
});
