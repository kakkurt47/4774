import {CommunityPost, SheetPost, User, VideoPost} from '@muzika/core';
import {UsersMock} from './users';

function createFree(post_id: number, title: string, author: User): CommunityPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    post_id,
    title,
    author,
    views: rand(),
    likes: rand(),
    comments: rand(),
    comment_list: [],
    tags: []
  };
}

function createVideo(post_id: number, title: string, author: User): VideoPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    post_id,
    title,
    author,
    views: rand(),
    likes: rand(),
    comments: rand(),
    comment_list: [],
    tags: [],
    video_thumb: null,
    youtube_url: null
  };
}

function createMusic(post_id: number, title: string, author: User): SheetPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    post_id,
    title,
    author,
    views: rand(),
    likes: rand(),
    comments: rand(),
    comment_list: [],
    tags: [],
    price: rand() * 100
  };
}

export const BestPostsMock: CommunityPost[] = [
  createFree(1, 'Community Open!', UsersMock[1]),
  createFree(2, 'Welcome to Muzika World', UsersMock[1]),
  createFree(3, 'Sell your own sheets', UsersMock[2]),
  createFree(4, 'Post Yourself', UsersMock[3]),
];

export const FreePostsMock: CommunityPost[] = [
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

export const MusicPostsMock: SheetPost[] = [
  createMusic(1, 'aliquet sagittis id consectetur', UsersMock[2]),
  createMusic(2, 'nibh venenatis cras sed', UsersMock[1]),
  createMusic(3, 'pellentesque pulvinar pellentesque habitant', UsersMock[1]),
  createMusic(4, 'tincidunt eget nullam non', UsersMock[2]),
  createMusic(5, 'sapien faucibus et molestie', UsersMock[3]),
  createMusic(6, 'lacus sed turpis tincidunt', UsersMock[3]),
  createMusic(7, 'mauris pharetra et ultrices', UsersMock[3]),
  createMusic(8, 'cras fermentum odio eu', UsersMock[2]),
  createMusic(9, 'lorem ipsum dolor sit', UsersMock[3]),
  createMusic(10, 'amet nisl suscipit adipiscing', UsersMock[1]),
  createMusic(11, 'volutpat lacus laoreet non', UsersMock[1]),
];
