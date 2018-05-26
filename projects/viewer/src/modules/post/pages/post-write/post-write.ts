import {Component} from '@angular/core';
import {FroalaEditorOptions} from '../../post.constant';
import {BaseComponent, BasePost, CommunityPost, SheetPost, Tag, VideoPost} from '@muzika/core';

export class BasePostWriteComponent extends BaseComponent {
  options = FroalaEditorOptions;
  tags: Tag[] = [];
  post: BasePost = <any>{};

  addTag(name: string) {
    name = name.toLowerCase();
    if (/^[a-z0-9.]+$/.test(name) && this.tags.findIndex(tag => tag.name === name) === -1) {
      this.tags.push({name});

      return true;
    }

    return false;
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  handleTagInput(event: any, dom: any) {
    if (event.charCode === 13 && this.addTag(dom.value)) {
      dom.value = '';
    }
  }
}

@Component({
  selector: 'app-post-community-write',
  templateUrl: './community/post-community-write.component.html',
  styleUrls: ['./post-write.scss', './community/post-community-write.component.scss']
})
export class PostCommunityWriteComponent extends BasePostWriteComponent {
  post: CommunityPost;
}

@Component({
  selector: 'app-post-sheet-write',
  templateUrl: './sheet/post-sheet-write.component.html',
  styleUrls: ['./post-write.scss', './sheet/post-sheet-write.component.scss']
})
export class PostSheetWriteComponent extends BasePostWriteComponent {
  post: SheetPost;
}

@Component({
  selector: 'app-post-video-write',
  templateUrl: './video/post-video-write.component.html',
  styleUrls: ['./post-write.scss', './video/post-video-write.component.scss']
})
export class PostVideoWriteComponent extends BasePostWriteComponent {
  post: VideoPost;
}
