import {tassign} from 'tassign';
import {CommentActions} from '../actions/comment.action';
import {PayloadAction} from '../actions/index';
import {PostComment} from '../models/comment';
import {PaginationResult} from '../models/pagination';

export interface CommentState {
  [key: string]: {
    [key: string]: PaginationResult<PostComment>
  };
}

export const initialState: CommentState = {
  community: {},
  music: {},
  video: {}
};

export const CommentReducer = function (state: CommentState = initialState, action: PayloadAction): CommentState {
  switch (action.type) {
    case CommentActions.SET_COMMENTS_RESULT:
      return tassign(state, {
        [action.payload.boardType]: tassign(state[action.payload.boardType], {
          [action.payload.boardID]: tassign(action.payload.result)
        })
      });

    default:
      return state;
  }
};
