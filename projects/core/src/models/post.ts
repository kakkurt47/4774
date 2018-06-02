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
  price: number | string;
  file_id?: number;
  file_name?: string;
  tx_hash?: string;
  ipfs_hash?: string;
  original_hash?: string;
  contract_address?: string;
}

export interface SheetMusic {
  sheet_id: number;
  title: string;
  price: number;
  author: User;
}
