import {Artist, User} from './user';

export interface BasePost {
  postId: number;
  title: string;
  views: number;
  likes: number;
  author: User;
}

export interface Post extends BasePost {

}

export interface SheetMusic extends BasePost {
  price: number;
  author: Artist;
}
