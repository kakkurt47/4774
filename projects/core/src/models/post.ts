import {Comment} from './comment';
import {Artist, User} from './user';

export interface BasePost {
  postId: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  author: User;
  tags: string[];
  commentList: Comment[];
}

// tslint:disable-next-line
export interface FreePost extends BasePost {

}

export interface VideoPost extends BasePost {
  videoThumb: string;
  youtubeUrl: string;
}

export interface SheetMusic extends BasePost {
  price: number;
  author: Artist;
}
