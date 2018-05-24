import {Action} from 'redux';
import {User} from '../models';

export type UserState = {
  currentUser: User;
};

const initialState: UserState = {
  currentUser: null
};

export function UserReducer(state: UserState = initialState, action: Action): UserState {
  switch(action.type) {
    default:
      return state;
  }
}

