import {tassign} from 'tassign';
import {PayloadAction, UserActions} from '../actions';
import {User} from '../models';

export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: null
};

export function UserReducer(state: UserState = initialState, action: PayloadAction): UserState {
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      if (!state.currentUser) {
        return tassign(state, {
          currentUser: tassign(action.payload)
        });
      } else {
        return tassign(state, {
          currentUser: action.payload
        });
      }

    default:
      return state;
  }
}
