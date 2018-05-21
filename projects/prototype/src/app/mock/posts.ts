import {Post} from '../model/post';
import {ArtistsMock} from './artists';

export const PostsMock: Post[] = [
  {
    postId: 1,
    title: 'Community Open!',
    views: 16,
    likes: 7,
    author: ArtistsMock[1]
  },
  {
    postId: 2,
    title: 'Post Yourself',
    views: 38,
    likes: 19,
    author: ArtistsMock[1]
  },
  {
    postId: 3,
    title: 'Welcome to Muzika World',
    views: 9,
    likes: 11,
    author: ArtistsMock[2]
  },
  {
    postId: 4,
    title: 'Sell your own sheets',
    views: 6,
    likes: 9,
    author: ArtistsMock[3]
  },
];
