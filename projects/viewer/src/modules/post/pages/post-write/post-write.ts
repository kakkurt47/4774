import {Component, Injector} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BasePost, BasePostDraft, CommunityPost, CommunityPostDraft, VideoPost, VideoPostDraft} from '@muzika/core';
import {BaseComponent, PostActions, UserActions} from '@muzika/core/angular';
import {AlertifyInstnace} from '@muzika/core/browser';
import {FroalaEditorOptions} from '../../post.constant';
import {Router} from '@angular/router';

export class BasePostWriteComponent extends BaseComponent {
  options = FroalaEditorOptions;

  post: BasePostDraft = <any>{
    tags: []
  };

  // override boardType in the classes extending this base component.
  boardType = '';

  selectedDraftId = '';
  currentDraftId = '';
  drafts: any = {};

  private _router: Router;
  private _postActions: PostActions;

  constructor(injector: Injector) {
    super();
    this._router = injector.get(Router);
    this._postActions = injector.get(PostActions);
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      UserActions.currentUserObs
        .subscribe(user => {
          if (!user) {
            this._router.navigateByUrl('/login', {
              queryParams: {
                redirectTo: this._router.url
              }
            });
          }
        })
    );

    this._sub.push(
      this._postActions.obs[this.boardType].subscribe(drafts => {
        this.drafts = drafts;
      })
    );

    this._postActions.loadPostDrafts(this.boardType);
  }

  addTag(name: string) {
    name = name.toLowerCase();
    if (/^[a-z0-9.]+$/.test(name) && this.post.tags.findIndex(tag => tag === name) === -1) {
      this.post.tags.push(name);

      return true;
    }

    return false;
  }

  removeTag(index: number) {
    this.post.tags.splice(index, 1);
  }

  handleTagInput(event: any, dom: any) {
    if (event.charCode === 13 && this.addTag(dom.value)) {
      dom.value = '';
    }
  }

  /* @TODO Implement functions */
  submit(form: NgForm): void {
    const prepared = this.prepare(form);

    if (prepared !== null) {
      return;
    }

    return;
  }

  askSaveQuestion() {
    AlertifyInstnace.confirm('Do you save the post to the draftbox?', () => {
      this.savePost();
    });
  }

  savePost() {
    if (!this.post.title) {
      AlertifyInstnace.alert('Fill the title to save.');
      return;
    }

    let draftId = this.currentDraftId;
    if (this.currentDraftId) {
      this._postActions.insertPostDraft(this.boardType, this.post, this.currentDraftId);
    } else {
      draftId = this._postActions.insertPostDraft(this.boardType, this.post);
    }
    this.selectedDraftId = draftId;
  }

  changeDraft() {
    if (this.currentDraftId) {
      this._postActions.insertPostDraft(this.boardType, this.post, this.currentDraftId);
    }

    if (this.selectedDraftId) {
      this.post = this.drafts[this.selectedDraftId];
      this.currentDraftId = this.selectedDraftId;
    } else {
      this._resetPost();
      this.currentDraftId = '';
    }
  }

  protected _resetPost() {
    this.post = <BasePostDraft>{
      type: 'streaming',
      tags: [],
      price: 0,
      files: [],
    };
  }

  protected prepare(form: NgForm): BasePostDraft | null {
    const c = form.controls;

    if (c.title.invalid) {
      AlertifyInstnace.alert('Fill the blank in title');
    } else if (!this.post.content) {
      AlertifyInstnace.alert('Fill content');
    } else {
      /* All of elements are passed */
      return this.post;
    }

    return null;
  }
}

@Component({
  selector: 'app-post-community-write',
  templateUrl: './community/post-community-write.component.html',
  styleUrls: ['./post-write.scss', './community/post-community-write.component.scss']
})
export class PostCommunityWriteComponent extends BasePostWriteComponent {
  boardType = 'community';
  post: CommunityPostDraft;

  constructor(private injector: Injector) {
    super(injector);
  }

  prepare(form: NgForm): BasePost {
    const prepared = <CommunityPost>super.prepare(form);

    if (prepared === null) {
      return null;
    }

    return prepared;
  }
}


@Component({
  selector: 'app-post-video-write',
  templateUrl: './video/post-video-write.component.html',
  styleUrls: ['./post-write.scss', './video/post-video-write.component.scss']
})
export class PostVideoWriteComponent extends BasePostWriteComponent {
  boardType = 'video';
  post: VideoPostDraft;
  youtubeUrlRegExp = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/;
  currentYoutubeVideoId: string;

  constructor(private injector: Injector) {
    super(injector);
  }

  onChangeYoutubeURL(url: string) {
    const videoId = this.youtubeUrlRegExp.exec(url);

    if (!!videoId && !!videoId[1] && videoId[1].length > 0) {
      this.currentYoutubeVideoId = videoId[1];
    } else {
      this.currentYoutubeVideoId = null;
    }

    this.post.youtube_url = url;
  }

  prepare(form: NgForm): BasePost {
    const prepared = <VideoPost>super.prepare(form);

    if (prepared === null) {
      return null;
    }

    if (!this.youtubeUrlRegExp.test(this.post.youtube_url)) {
      AlertifyInstnace.alert('Invalid Youtube URL');
      return null;
    }

    return prepared;
  }

  protected _resetPost() {
    super._resetPost();
    this.post.youtube_url = '';
  }
}
