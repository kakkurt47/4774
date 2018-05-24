import {Artist, FreePost, MusicPost, User, VideoPost} from '@muzika/core';
import {ArtistsMock} from './artists';
import {UsersMock} from './users';

function createFree(postId: number, title: string, author: User): FreePost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    postId,
    title,
    author,
    views: rand(),
    likes: rand(),
    comments: rand(),
    commentList: [],
    tags: []
  }
}

function createVideo(postId: number, title: string, author: User): VideoPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    postId,
    title,
    author,
    views: rand(),
    likes: rand(),
    comments: rand(),
    commentList: [],
    tags: [],
    videoThumb: null,
    youtubeUrl: null
  }
}

function createMusic(postId: number, title: string, author: Artist): MusicPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    postId,
    title,
    author,
    views: rand(),
    likes: rand(),
    comments: rand(),
    commentList: [],
    tags: [],
    price: rand() * 100
  }
}

export const BestPostsMock: FreePost[] = [
  createFree(1, 'Community Open!', UsersMock[1]),
  createFree(2, 'Welcome to Muzika World', UsersMock[1]),
  createFree(3, 'Sell your own sheets', UsersMock[2]),
  createFree(4, 'Post Yourself', UsersMock[3]),
];

export const FreePostsMock: FreePost[] = [
  createFree(1, 'vulputate dignissim suspendisse in', UsersMock[3]),
  createFree(2, 'praesent semper feugiat nibh', UsersMock[2]),
  createFree(3, 'faucibus in ornare quam', UsersMock[1]),
  createFree(4, 'tortor aliquam nulla facilisi', UsersMock[1]),
  createFree(5, 'nunc scelerisque viverra mauris', UsersMock[2]),
  createFree(6, 'dolor morbi non arcu', UsersMock[3]),
  createFree(7, 'orci nulla pellentesque dignissim', UsersMock[3]),
  createFree(8, 'diam maecenas sed enim', UsersMock[2]),
  createFree(9, 'elit ullamcorper dignissim cras', UsersMock[1]),
  createFree(10, 'pharetra magna ac placerat', UsersMock[1]),
  createFree(11, 'nullam non nisi est', UsersMock[2]),
];

export const VideoPostsMock: VideoPost[] = [
  createVideo(1, 'Contrary to popular belief', UsersMock[1]),
  createVideo(2, 'Lorem Ipsum available', UsersMock[2]),
  createVideo(3, 'the Internet tend to repeat', UsersMock[1]),
  createVideo(4, 'alteration in some form', UsersMock[3]),
  createVideo(5, 'Various versions have evolved', UsersMock[1]),
  createVideo(6, 'Morbi porttitor est', UsersMock[2]),
  createVideo(7, 'Proin dictum, ex', UsersMock[2]),
  createVideo(8, 'Phasellus iaculis enim', UsersMock[3]),
  createVideo(9, 'Sed vitae enim a', UsersMock[3]),
  createVideo(10, 'Nullam vel nisl vulputate', UsersMock[2]),
  createVideo(11, 'Cras pulvinar ipsum luctus', UsersMock[2]),
];

export const MusicPostsMock: MusicPost[] = [
  createMusic(1, 'aliquet sagittis id consectetur', ArtistsMock[2]),
  createMusic(2, 'nibh venenatis cras sed', ArtistsMock[1]),
  createMusic(3, 'pellentesque pulvinar pellentesque habitant', ArtistsMock[1]),
  createMusic(4, 'tincidunt eget nullam non', ArtistsMock[2]),
  createMusic(5, 'sapien faucibus et molestie', ArtistsMock[3]),
  createMusic(6, 'lacus sed turpis tincidunt', ArtistsMock[3]),
  createMusic(7, 'mauris pharetra et ultrices', ArtistsMock[3]),
  createMusic(8, 'cras fermentum odio eu', ArtistsMock[2]),
  createMusic(9, 'lorem ipsum dolor sit', ArtistsMock[3]),
  createMusic(10, 'amet nisl suscipit adipiscing', ArtistsMock[1]),
  createMusic(11, 'volutpat lacus laoreet non', ArtistsMock[1]),
];
