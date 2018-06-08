import {PostComment} from './comment';
import {User} from './user';

export interface BasePost {
  post_id: number;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  author: User;
  tags: string[];
  comment_list: PostComment[];
  created_at: string;
}

// tslint:disable-next-line
export interface CommunityPost extends BasePost {

}

export interface VideoPost extends BasePost {
  video_thumb: string;
  youtube_url: string;
}

export interface SheetPost extends BasePost {
  price?: number | string;
  music_files?: SheetMusic;
}

export interface SheetMusic {
  paper_id: number;
  file_id: number;
  name: string;
  ipfs_file_hash: string;
  aes_key: string;
  tx_hash: string;
  contract_address?: string;
  original_hash?: string;
}
