import {FreePost} from '../model/post';
import {ArtistsMock} from './artists';

export const PostsMock: FreePost[] = [
  {
    postId: 1,
    title: 'Community Open!',
    views: 16,
    likes: 7,
    comments: 0,
    commentList: [],
    tags: [],
    author: ArtistsMock[1]
  },
  {
    postId: 2,
    title: 'Post Yourself',
    views: 38,
    likes: 19,
    comments: 0,
    commentList: [],
    tags: [],
    author: ArtistsMock[1]
  },
  {
    postId: 3,
    title: 'Welcome to Muzika World',
    views: 9,
    likes: 11,
    comments: 0,
    commentList: [],
    tags: [],
    author: ArtistsMock[2]
  },
  {
    postId: 4,
    title: 'Sell your own sheets',
    views: 6,
    likes: 9,
    comments: 0,
    commentList: [],
    tags: [],
    author: ArtistsMock[3]
  },
];
