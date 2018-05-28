import {Component, EventEmitter, Injector} from '@angular/core';
import {FroalaEditorOptions, GenreSelections, InstrumentSelections} from '../../post.constant';
import {
  APIConfig, BaseComponent, BasePost, CommunityPost, ExtendedWeb3, LocalStorage, MuzikaContractService, promisify, SheetPost,
  VideoPost
} from '@muzika/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {AlertService} from '../../../alert/alert.service';
import {UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';

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
  submit(form: NgForm): void {
    const prepared = this.prepare(form);

    if (prepared !== null) {
      return;
    }

    return;
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

  uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  uploadStatus: {
    status: string;
    progress: number;
    fileName: string;
    fileId?: number;
    process?: string;
    ipfsFileHash: string;
  };

  constructor(private injector: Injector,
              private alertService: AlertService,
              private apiConfig: APIConfig,
              private localStorage: LocalStorage,
              private web3: ExtendedWeb3,
              private contractService: MuzikaContractService) {
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

    /* only file upload finished */
    if (this.uploadStatus.status !== 'done') {
      this.alertService.alert('Music file is not yet uploaded');
      return null;
    }

    prepared.tags = [
      this.songType,
      ...Array.from(this.genres.values()),
      ...Array.from(this.instruments.values())
    ];

    return prepared;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: `${this.apiConfig.apiUrl}/file?type=paper&auth=${this.localStorage.getItem('token')}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.localStorage.getItem('token')}`
        }
      };

      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.uploadStatus = {
        status: 'uploading',
        fileId: null,
        fileName: output.file.name,
        progress: 0,
        process: null,
        ipfsFileHash: null
      };
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      this.uploadStatus.progress = output.file.progress.data.percentage;

      if (this.uploadStatus.progress === 100) {
        this.uploadStatus.process = 'pending';
      }
    } else if (output.type === 'removed') {
      this.uploadStatus = null;
    } else if (output.type === 'done') {
      if (output.file.responseStatus === 200 && output.file.response.file_id) {
        this.uploadStatus.status = 'done';
        this.uploadStatus.fileId = output.file.response.file_id;
        this.uploadStatus.ipfsFileHash = output.file.response.ipfs_hash;
      } else {
        this.uploadStatus.status = 'failed';
      }
    }
  }

  submit(form: NgForm): void {
    const prepared = <SheetPost>this.prepare(form);

    if (prepared !== null) {
      promisify(this.web3.eth.accounts).then(accounts => {
        this.contractService.createNewPaperContract(
          accounts[0],
          prepared.price,
          this.uploadStatus.ipfsFileHash,
          'NotSupported'
        ).subscribe(txHash => {
          console.log(txHash);
        });
      });
    }
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

    this.post.youtube_url = url;
  }

  prepare(form: NgForm): BasePost {
    const prepared = <VideoPost>super.prepare(form);

    if (prepared === null) {
      return null;
    }

    if (!this.youtubeUrlRegExp.test(this.post.youtube_url)) {
      this.alertService.alert('Invalid Youtube URL');
      return null;
    }

    return prepared;
  }
}
