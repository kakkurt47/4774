import {Action} from 'redux';
import {UserActions} from '../actions/user.action';
import {User} from '../models';

export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: null
};

export function UserReducer(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    default:
      return state;
  }
}
