import {Action} from 'redux';
import {tassign} from 'tassign';
import {InfPaginationResult, PaginationResult} from '../models/pagination';
import {BasePost} from '../models/post';
import {PayloadAction} from '../models/redux-action';

export class PostActionType {
  static INSERT_POSTS_LIST = '[posts] Insert posts list';
  static INSERT_POSTS_BEFORE_LIST = '[posts] Insert posts into bottom of list';
  static INSERT_POSTS_AFTER_LIST = '[posts] Insert posts into top of list';
  static RESET_POSTS = '[posts] Reset list';
  static RESET_INF_POSTS = '[posts] Reset inf list';
  static LIKE_TOGGLE_POST = '[posts] like toggle post';
  static SAVE_POSTS = '[posts] save posts';
  static SAVE_POST_ADDITION = '[posts] save post additional info';
}

export interface PostState {
  posts: {
    [boardType: string]: PaginationResult<BasePost>
  };
  infPosts: {
    [boardType: string]: InfPaginationResult<BasePost>
  };
  post: {
    [boardType: string]: {
      [postId: string]: BasePost
    }
  };
  postAddition: {
    [boardType: string]: {
      [postId: string]: any
    }
  };
}

const initialState: PostState = {
  posts: {
    community: {total: 0, page: [], list: []},
    music: {total: 0, page: [], list: []},
    video: {total: 0, page: [], list: []}
  },
  infPosts: {
    community: {after: null, before: null, list: []},
    music: {after: null, before: null, list: []},
    video: {after: null, before: null, list: []}
  },
  post: {
    community: {}, music: {}, video: {}
  },
  postAddition: {
    community: {}, music: {}, video: {}
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

function syncPostToState(postState, boardType, posts: BasePost[], update_column: string = null) {
  if (!update_column) {
    update_column = 'all';
  }

  return posts.map(post => {
    postState[boardType][post.post_id] = postState[boardType][post.post_id] || {};

    const attrs = update_column === 'all' ? Object.keys(post) : update_column.split(',');
    attrs.forEach(attr => {
      if (post.hasOwnProperty(attr) && postState[boardType][post.post_id][attr] !== post[attr]) {
        if (attr === 'content') {
          post.content = post.content.split('https://www.youtube.com/embed/').join('//www.youtube.com/embed/');
          post.content = post.content.split('//www.youtube.com/embed/').join('https://www.youtube.com/embed/');
        }
        postState[boardType][post.post_id][attr] = post[attr];
      }
    });

    return postState[boardType][post.post_id];
  });
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
      [payload.boardType]: InfPaginationResultCombine<BasePost>(state.infPosts[payload.boardType],
        {
          after: payload.after,
          before: payload.before,
          list: syncPostToState(state.post, payload.boardType, payload.list)
        }, insertType, 'id')
    })
  });
}

export const PostReducer = function (state: PostState = initialState, _action: Action): PostState {
  const action: PayloadAction = <PayloadAction>_action;
  switch (_action.type) {
    case PostActionType.RESET_POSTS:
      return tassign(state, {
        posts: tassign(state.posts, {
          [action.payload.boardType]: {total: 0, page: [], list: []} as PaginationResult<BasePost>
        })
      });

    case PostActionType.RESET_INF_POSTS:
      return tassign(state, {
        infPosts: tassign(state.infPosts, {
          [action.payload.boardType]: {after: null, before: null, list: []}
        })
      });

    case PostActionType.INSERT_POSTS_LIST:
      return tassign(state, {
        posts: tassign(state.posts, {
          [action.payload.boardType]: <PaginationResult<BasePost>>{
            ...action.payload,
            ...{
              list: syncPostToState(state.post, action.payload.boardType, action.payload.list)
            }
          }
        })
      });

    case PostActionType.INSERT_POSTS_BEFORE_LIST:
      return postsActionState(state, action.payload, 'before');

    case PostActionType.INSERT_POSTS_AFTER_LIST:
      return postsActionState(state, action.payload, 'after');

    case PostActionType.SAVE_POSTS:
      const savePostAction = (<SavePostAction> _action);

      syncPostToState(state.post, savePostAction.boardType, savePostAction.posts, savePostAction.update_column);

      return tassign(state, {
        post: tassign(state.post, {
          [savePostAction.boardType]: tassign(state.post[savePostAction.boardType])
        })
      });

    case PostActionType.LIKE_TOGGLE_POST:
      const likePostAction = (<PostLikeAction> _action);

      if (state.post[likePostAction.boardType][likePostAction.boardID]) {
        state.post[likePostAction.boardType][likePostAction.boardID].likes += likePostAction.diff;
      }

      return state;

    case PostActionType.SAVE_POST_ADDITION:
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
