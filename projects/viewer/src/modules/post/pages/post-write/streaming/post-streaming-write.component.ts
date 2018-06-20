import { Component, Injector } from '@angular/core';
import { BasePost, MusicContract, MusicPost, MuzikaFilePath, unitDown, User } from '@muzika/core';
import { InstrumentSelections, StreamingMusicGenreSelections } from '../../../post.constant';
import { IpcRendererService } from '../../../../../providers/ipc-renderer.service';
import { MuzikaContractService, PostActions, UserActions } from '@muzika/core/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyInstnace } from '@muzika/core/browser';
import { IPCUtil } from '../../../../../../shared/ipc-utils';
import { BasePostWriteComponent } from '../post-write';
import { ElectronService } from '../../../../../providers/electron.service';

@Component({
  selector: 'app-post-music-write',
  templateUrl: './post-streaming-write.component.html',
  styleUrls: [
    '../post-write.scss',
    '../post-music-write.scss',
    './post-streaming-write.component.scss'
  ]
})
export class PostStreamingMusicWriteComponent extends BasePostWriteComponent {
  post: MusicPost = <any>{
    tags: [],
    price: 0
  };

  currentUser: User;

  songType: '~cover' | '~original' = '~original';

  genreSelections = StreamingMusicGenreSelections;

  genres: Set<string> = new Set();

  files: { file: File, previews: File[] }[] = [];
  coverImageFile: File;
  musicVideoFile: File;
  uploadStatus: {
    status: string;
    progress: number[];
    process?: string;
    ipfsFileHash: string;
    aesKey: Buffer;
  };

  constructor(private injector: Injector,
              private ipcRendererService: IpcRendererService,
              private contractService: MuzikaContractService,
              private router: Router,
              private electronService: ElectronService,
              private postActions: PostActions) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      this.electronService.onDragFile
        .subscribe(file => {
          console.log('addFile', file);
          this.addFile(file);
        })
    );

    this._sub.push(
      UserActions.currentUserObs.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  toggleGenre(value: string) {
    if (this.genres.has(value)) {
      this.genres.delete(value);
    } else {
      this.genres.add(value);
    }
  }

  // @TODO check if file uploaded
  prepare(form: NgForm): BasePost {
    const prepared = <MusicPost>super.prepare(form);

    if (prepared === null) {
      return null;
    }

    /* check genre */
    if (this.genres.size === 0) {
      AlertifyInstnace.alert('The number of genres should be between 1 and 3');
      return null;
    }

    /* check price */
    if (form.controls.price.invalid || this.post.price < 0) {
      AlertifyInstnace.alert('Price must be more than 0');
      return null;
    }

    /* only file upload finished */
    if (this.uploadStatus.status !== 'done') {
      AlertifyInstnace.alert('Music file is not yet uploaded');
      return null;
    }

    prepared.tags = [
      this.songType,
      ...Array.from(this.genres.values())
    ];

    prepared.music_contract = <MusicContract>{
      ipfs_file_hash: this.uploadStatus.ipfsFileHash,
      tx_hash: null,

      // @TODO calculate file hash
      // suggestion: hash calculated from node backend, using raw level code like c implementation
      original_hash: 'Not Supported'
    };

    return prepared;
  }

  addFile(selectedFile: File) {
    if (this.files.some(file => file.file.name === selectedFile.name)) {
      AlertifyInstnace.alert('File is already added');
    } else {
      this.files.push({ file: selectedFile, previews: [] });
    }
  }

  addCoverImage(selectedFile: File) {
    this.coverImageFile = selectedFile;
  }

  addMusicVideo(selectedFile: File) {
    this.musicVideoFile = selectedFile;
  }

  addPreview(idx: number, $event: any) {
    this.files[idx].previews.push($event.target.files[0]);
  }

  submit(form: NgForm): void {
    this.uploadStatus = {
      status: 'uploading',
      progress: Array(this.files.length).fill(0),
      process: null,
      ipfsFileHash: null,
      aesKey: null
    };

    this.uploadFile().subscribe(([type, progress, hash, aesKey]) => {
      if (type === 'progress') {
        progress.map((percent, idx) => {
          if (idx < this.uploadStatus.progress.length) {
            this.uploadStatus.progress[idx] = Math.round(percent * 10000) / 100;
          }
        });
      } else {
        this.uploadStatus.status = 'done';
        this.uploadStatus.progress.map((_, idx) => this.uploadStatus.progress[idx] = 100);
        this.uploadStatus.ipfsFileHash = hash;
        this.uploadStatus.aesKey = aesKey;

        const prepared = <MusicPost>this.prepare(form);

        if (prepared !== null) {
          this.contractService.createNewPaperContract(
            this.currentUser.address,
            unitDown(prepared.price),
            prepared.music_contract.ipfs_file_hash,
            prepared.music_contract.original_hash
          ).subscribe(txHash => {
            prepared.music_contract.tx_hash = txHash;
            prepared.music_contract.aes_key = this.uploadStatus.aesKey.toString('base64');

            this.postActions.write('music', prepared).subscribe(() => {
              this.router.navigate(['/board/streaming/write/complete'], {
                queryParams: {
                  txHash: txHash,
                  title: prepared.title
                }
              });
            });
          });
        }
      }
    });
  }

  private uploadFile() {
    const filePaths: MuzikaFilePath[] = this.files.map(file => {
      return {
        path: file.file.path,
        previews: file.previews.map(preview => preview.path)
      };
    });

    return this.ipcRendererService.sendAsyncWithProgress(IPCUtil.EVENT_FILE_UPLOAD, filePaths, true, {
      type: 'music',
      title: this.post.title,
      description: this.post.content,
      author: this.currentUser.name,
      authorAddress: this.currentUser.address,
      coverImagePath: (this.coverImageFile) ? this.coverImageFile.path : null
    });
  }
}
