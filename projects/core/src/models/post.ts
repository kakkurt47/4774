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
  commentList: PostComment[];
}

// tslint:disable-next-line
export interface CommunityPost extends BasePost {

}

export interface VideoPost extends BasePost {
  videoThumb: string;
  youtubeUrl: string;
}

export interface SheetPost extends BasePost {
  price: number;
}

export interface SheetMusic {
  sheetId: number;
  title: string;
  price: number;
  author: User;
}

export class PostRef {
  constructor(public boardType: string,
              public postID: number) {
  }

  // update = true 옵션은
  static syncPost(postDBRef, boardType, posts: BasePost[], update_column: string = null) {
    if (!update_column)
      update_column = 'all';
    return posts.map(post => {
      let is_changed = false;
      if (post instanceof PostRef) return post;
      if (postDBRef[boardType][post.post_id]) {
        const attrs = update_column === 'all' ? Object.keys(post) : update_column.split(',');
        attrs.forEach(attr => {
          if (post.hasOwnProperty(attr) && postDBRef[boardType][post.post_id][attr] !== post[attr]) {
            if (attr === 'description') {
              post.content = post.content.split('https://www.youtube.com/embed/').join('//www.youtube.com/embed/');
              post.content = post.content.split('//www.youtube.com/embed/').join('https://www.youtube.com/embed/');
            }
            if (attr !== 'description' || post[attr] !== '') {
              postDBRef[boardType][post.post_id][attr] = post[attr];
              is_changed = true;
            }
          }
        });
        if (is_changed) {
          // reference를 교체해줌
          postDBRef[boardType][post.post_id] = Object.assign({}, postDBRef[boardType][post.post_id]);
        }
      } else {
        if (post.hasOwnProperty('description')) {
          post.content = post.content.split('https://www.youtube.com/embed/').join('//www.youtube.com/embed/');
          post.content = post.content.split('//www.youtube.com/embed/').join('https://www.youtube.com/embed/');
        }
        postDBRef[boardType][post.post_id] = Object.assign({}, post);
      }
      return new PostRef(boardType, post.post_id);
    });
  }

  static getPost(postDBRef, postRef: PostRef) {
    return postDBRef[postRef.boardType][postRef.postID];
  }
}
