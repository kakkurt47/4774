import {User} from './user';

export interface PostComment {
  comment_id: number;
  post_id: number;
  parent_comment_id: number;
  author: User;
  content: string;
  likes: number;
  replyCnt: number;

  replyList: PostComment[];

  myLike?: boolean;
}
