import {tassign} from 'tassign';
import {PayloadAction, UserActions} from '../actions';
import {User} from '../models';

export interface UserState {
  currentUser: User;

  boardLikes: {
    community: number[],
    sheet: number[],
    video: number[]
  };
  commentLikes: {
    community: number[],
    sheet: number[],
    video: number[]
  };
}

const initialState: UserState = {
  currentUser: null,
  boardLikes: {community: [], sheet: [], video: []},
  commentLikes: {community: [], sheet: [], video: []},
};

export function UserReducer(state: UserState = initialState, action: PayloadAction): UserState {
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      return tassign(state, {
        currentUser: (!state.currentUser) ? tassign(action.payload) : null
      });

    case UserActions.SET_BOARD_LIKES:
    case UserActions.SET_COMMENT_LIKES:
      const boardType = action.payload.boardType;

      if (action.type === UserActions.SET_COMMENT_LIKES) {
        return tassign(state, {
          commentLikes: tassign(state.commentLikes, {[boardType]: action.payload.likes})
        });
      } else {
        return tassign(state, {
          boardLikes: tassign(state.boardLikes, {[boardType]: action.payload.likes})
        });
      }

    default:
      return state;
  }
}
