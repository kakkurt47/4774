import {Comment} from './comment';
import {User} from './user';

export interface BasePost {
  postId: number;
  title: string;
  description: string;
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

export interface MusicPost extends BasePost {
  price: number;
}

export interface SheetMusic {
  sheetId: number;
  title: string;
  price: number;
  author: User;
}
