import {Action} from 'redux';
import {tassign} from 'tassign';
import {PayloadAction} from '../actions/index';
import {PostActions} from '../actions/post.action';
import {InfPaginationResult, PaginationResult} from '../models/pagination';
import {PostRef, BasePost} from '../models/post';

export interface PostsState {
  posts: {
    [key: string]: PaginationResult<PostRef>
  };
  infPosts: {
    [key: string]: InfPaginationResult<PostRef>
  };
  post: {
    [key: string]: {
      [key: string]: BasePost
    }
  };
  postAddition: {
    [key: string]: {
      [key: string]: any
    }
  };
}

const initialState: PostsState = {
  posts: {
    community: {total: 0, page: [], list: []},
    sheet: {total: 0, page: [], list: []},
    video: {total: 0, page: [], list: []}
  },
  infPosts: {
    community: {after: null, before: null, list: []},
    sheet: {after: null, before: null, list: []},
    video: {after: null, before: null, list: []}
  },
  post: {
    community: {}, sheet: {}, video: {}
  },
  postAddition: {
    community: {}, sheet: {}, video: {}
  }
};

export interface PostLikeAction extends Action {
  boardType: string;
  boardID: string;
  diff: number;
}

export interface ResetPostsAction extends Action {
  boardType: string;
}

export interface SavePostAction extends Action {
  boardType: string;
  boardID: string;
  posts: BasePost[];
  update_column: string;
}

export interface PostAdditionAction extends Action {
  boardType: string;
  boardID: string;
  additionalInfo: any;
}

function InfPaginationResultCombine<T>(target: InfPaginationResult<T>,
                                       source: InfPaginationResult<T>,
                                       insertType: 'after' | 'before',
                                       compareType: string | null = null): InfPaginationResult<T> {
  const nextResult: InfPaginationResult<any> = {list: [], after: null, before: null};

  switch (insertType) {
    case 'after':
      nextResult.list = [
        ...source.list,
        ...target.list
      ];
      break;
    case 'before':
      nextResult.list = [
        ...target.list,
        ...source.list
      ];
      break;
  }

  if (compareType !== null) {
    let prevPost = null;
    target.list = target.list.filter(post => {
      if (prevPost !== null && prevPost[compareType] === post[compareType]) {
        return false;
      }
      prevPost = post;
      return true;
    });
  }

  switch (insertType) {
    case 'after':
      nextResult.before = target.before || source.before;
      nextResult.after = source.after || target.after;

      break;
    case 'before':
      nextResult.after = target.after || source.after;
      nextResult.before = source.before || target.before;
      break;
  }

  return nextResult;
}

// Infinite Scroll list 처리
function postsActionState(state, payload: any, insertType: 'after' | 'before') {
  return tassign(state, {
    infPosts: tassign(state.infPosts, {
      [payload.boardType]: InfPaginationResultCombine<PostRef>(state.infPosts[payload.boardType],
        {
          after: payload.after,
          before: payload.before,
          list: PostRef.syncPost(state.post, payload.boardType, payload.list)
        }, insertType, 'id')
    })
  });
}

export const PostsReducer = function (state: PostsState = initialState, _action: Action): PostsState {
  const action: PayloadAction = <PayloadAction>_action;
  switch (_action.type) {
    case PostActions.RESET_POSTS:
      return tassign(state, {
        posts: tassign(state.posts, {
          [action.payload.boardType]: {total: 0, page: [], list: []} as PaginationResult<PostRef>
        })
      });

    case PostActions.RESET_INF_POSTS:
      return tassign(state, {
        infPosts: tassign(state.infPosts, {
          [action.payload.boardType]: {after: null, before: null, list: []}
        })
      });

    case PostActions.INSERT_POSTS_LIST:
      return tassign(state, {
        posts: tassign(state.posts, {
          [action.payload.boardType]: <PaginationResult<PostRef>>{
            ...action.payload,
            ...{
              list: PostRef.syncPost(state.post, action.payload.boardType, action.payload.list)
            }
          }
        })
      });

    case PostActions.INSERT_POSTS_BEFORE_LIST:
      return postsActionState(state, action.payload, 'before');

    case PostActions.INSERT_POSTS_AFTER_LIST:
      return postsActionState(state, action.payload, 'after');

    case PostActions.SAVE_POSTS:
      const savePostAction = (<SavePostAction> _action);

      PostRef.syncPost(state.post, savePostAction.boardType, savePostAction.posts, savePostAction.update_column);

      return tassign(state, {
        post: tassign(state.post, {
          [savePostAction.boardType]: tassign(state.post[savePostAction.boardType])
        })
      });

    case PostActions.LIKE_TOGGLE_POST:
      const likePostAction = (<PostLikeAction> _action);

      if (state.post[likePostAction.boardType][likePostAction.boardID]) {
        state.post[likePostAction.boardType][likePostAction.boardID].likes += likePostAction.diff;
      }

      return state;

    case PostActions.SAVE_POST_ADDITION:
      const postAdditionAction = (<PostAdditionAction> _action);

      return tassign(state, {
        postAddition: tassign(state.postAddition, {
          [postAdditionAction.boardType]: tassign(state.postAddition[postAdditionAction.boardType], {
            [postAdditionAction.boardID]: postAdditionAction.additionalInfo
          })
        })
      });

    default:
      return state;
  }
};
