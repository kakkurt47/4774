import {PostComment} from '@muzika/core';
import {UsersMock} from './users';

export const PostCommentsMock: PostComment[] = [
  {
    comment_id: 1,
    post_id: 1,
    parent_comment_id: null,
    author: UsersMock[1],
    content: 'Hi! Thank you for your post',
    likes: 15,
    reply_cnt: 0,
    reply_list: [],
    my_like: false,
  },
  {
    comment_id: 2,
    post_id: 1,
    parent_comment_id: null,
    author: UsersMock[2],
    content: 'Temesesque quam accipit Gorgoneas salve deseruit.',
    likes: 4,
    reply_cnt: 2,
    reply_list: [
      {
        comment_id: 3,
        post_id: 1,
        parent_comment_id: 2,
        author: UsersMock[2],
        content: 'Per nervo multorum, tu pati, flammaeque iuvit',
        likes: 0,
        reply_cnt: 0,
        reply_list: [],
        my_like: false,
      },
      {
        comment_id: 4,
        post_id: 1,
        parent_comment_id: 2,
        author: UsersMock[1],
        content: 'Pofela mofills hoopsten goccis',
        likes: 0,
        reply_cnt: 0,
        reply_list: [],
        my_like: false,
      }
    ],
    my_like: false,
  },
  {
    comment_id: 5,
    post_id: 1,
    parent_comment_id: null,
    author: UsersMock[3],
    content: 'Shelmic gist dot compute folling turn',
    likes: 4,
    reply_cnt: 0,
    reply_list: [],
    my_like: false,
  }
];
