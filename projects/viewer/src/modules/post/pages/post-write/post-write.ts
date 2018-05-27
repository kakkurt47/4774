import {Component, Injector} from '@angular/core';
import {FroalaEditorOptions, GenreSelections, InstrumentSelections} from '../../post.constant';
import {BaseComponent, BasePost, CommunityPost, SheetPost, VideoPost} from '@muzika/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {AlertService} from '../../../alert/alert.service';

export class BasePostWriteComponent extends BaseComponent {
  options = FroalaEditorOptions;

  post: BasePost = <any>{
    tags: []
  };

  /* Should provide services */
  private _alertService: AlertService;

  constructor(injector: Injector) {
    super();

    /* provide */
    this._alertService = injector.get(AlertService);
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
  submit(form: NgForm): Observable<any> {
    const prepared = this.prepare(form);

    if (prepared !== null) {
      return null;
    }

    return null;
  }

  protected prepare(form: NgForm): BasePost | null {
    const c = form.controls;

    if (c.title.invalid) {
      this._alertService.alert('Fill the blank in title');
    } else if (!this.post.content) {
      this._alertService.alert('Fill content');
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
  post: CommunityPost;

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
  selector: 'app-post-sheet-write',
  templateUrl: './sheet/post-sheet-write.component.html',
  styleUrls: ['./post-write.scss', './sheet/post-sheet-write.component.scss']
})
export class PostSheetWriteComponent extends BasePostWriteComponent {
  post: SheetPost = <any>{
    tags: [],
    price: 0,
  };

  songType: '~cover' | '~original' = '~original';

  genreSelections = GenreSelections;
  instrumentSelections = InstrumentSelections;

  genres: Set<string> = new Set();
  instruments: Set<string> = new Set();

  constructor(private injector: Injector,
              private alertService: AlertService) {
    super(injector);
  }

  toggleGenre(value: string) {
    if (this.genres.has(value)) {
      this.genres.delete(value);
    } else {
      this.genres.add(value);
    }
  }

  toggleInstrument(value: string) {
    if (this.instruments.has(value)) {
      this.instruments.delete(value);
    } else {
      this.instruments.add(value);
    }
  }

  // @TODO check if file uploaded
  prepare(form: NgForm): BasePost {
    const prepared = <SheetPost>super.prepare(form);

    if (prepared === null) {
      return null;
    }

    /* check song type */
    if (['~cover', '~original'].indexOf(this.songType) === -1) {
      this.alertService.alert('Choose the song type, cover or original');
      return null;
    }

    /* check genre */
    if (this.genres.size === 0) {
      this.alertService.alert('The number of genres should be between 1 and 3');
      return null;
    }

    /* check instruments */
    if (this.instruments.size === 0) {
      this.alertService.alert('The number of instruments should be more than 1');
      return null;
    }

    /* check price */
    if (form.controls.price.invalid || this.post.price < 0) {
      this.alertService.alert('Price must be more than 0');
      return null;
    }

    prepared.tags = [
      this.songType,
      ...Array.from(this.genres.values()),
      ...Array.from(this.instruments.values())
    ];

    return prepared;
  }
}

@Component({
  selector: 'app-post-video-write',
  templateUrl: './video/post-video-write.component.html',
  styleUrls: ['./post-write.scss', './video/post-video-write.component.scss']
})
export class PostVideoWriteComponent extends BasePostWriteComponent {
  post: VideoPost;
  youtubeUrlRegExp = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/;
  currentYoutubeVideoId: string;

  constructor(private injector: Injector,
              private alertService: AlertService) {
    super(injector);
  }

  onChangeYoutubeURL(url: string) {
    const videoId = this.youtubeUrlRegExp.exec(url);

    if (!!videoId && !!videoId[1] && videoId[1].length > 0) {
      this.currentYoutubeVideoId = videoId[1];
    } else {
      this.currentYoutubeVideoId = null;
    }

    this.post.youtubeUrl = url;
  }

  prepare(form: NgForm): BasePost {
    const prepared = <VideoPost>super.prepare(form);

    if (prepared === null) {
      return null;
    }

    if (!this.youtubeUrlRegExp.test(this.post.youtubeUrl)) {
      this.alertService.alert('Invalid Youtube URL');
      return null;
    }

    return prepared;
  }
}
