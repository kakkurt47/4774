import {SheetMusic} from '../model/post';
import {ArtistsMock} from './artists';

export const SheetsMock: SheetMusic[] = [
  {
    postId: 1,
    title: 'Sheet Music',
    price: 120,
    views: 34,
    likes: 6,
    author: ArtistsMock[2]
  },
  {
    postId: 2,
    title: 'First Song',
    price: 300,
    views: 41,
    likes: 13,
    author: ArtistsMock[1]
  },
  {
    postId: 3,
    title: 'Your Names',
    price: 240,
    views: 43,
    likes: 10,
    author: ArtistsMock[3]
  },
  {
    postId: 4,
    title: 'My Names',
    price: 210,
    views: 6,
    likes: 9,
    author: ArtistsMock[3]
  },
];
