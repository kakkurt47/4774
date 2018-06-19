import {PostComment} from './comment';
import {User} from './user';
import {IpfsFile} from './file';

export class BoardType {
  static MUSIC = 'music';
  static VIDEO = 'video';
  static COMMUNITY = 'community';

  static OWN(ownType) {
    return 'own' + ownType;
  }

  static SEARCH(searchType) {
    return 'searched' + searchType;
  }
}

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

export interface MusicPost extends BasePost {
  price?: number | string;
  music_contract?: MusicContract;
  ipfs_file?: IpfsFile;
}

export interface MusicContract {
  contract_id: number;
  ipfs_file_id?: number;
  ipfs_file_hash?: string;
  aes_key?: string;
  tx_hash: string;
  contract_address?: string;
  original_hash?: string;
}
