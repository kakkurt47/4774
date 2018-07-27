import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'airdrop-content-like',
  template: `
    <div class="title" *ngIf="current === 2">
      아티스트의 곡이 마음에 드시나요? <BR />
      <i class="fas fa-heart"></i> <span class="heart">하트</span>로 마음을 표현해주세요
    </div>
    <div class="title" *ngIf="current === 3">
      아티스트의 곡이 마음에 드시나요? <BR />
      댓글로 응원해주세요!
    </div>
    <div class="header mb-3">
      <img [src]="'assets/airdrop/artist/' + selectedArtist.imgPath">
      <div class="name pl-3">
        {{selectedArtist.name}}
      </div>
    </div>
    <div class="content">
      <iframe *ngIf="videoUrl" [src]="videoUrl" frameborder="0" width="520" height="300"></iframe>
    </div>
    <div class="song-title pt-3 pb-3">
      {{selectedArtist.title}}
      <div class="heart-btn" [class.active]="alreadyLiked" (click)="like()">
        <i class="fal fa-heart"></i> 좋아요
      </div>
    </div>
    <airdrop-content-comment *ngIf="current === 3" (addLP)="add($event)"></airdrop-content-comment>
    <airdrop-lp-modal [class.close]="!modalOpen"
                      (addLP)="add($event)"
                      message="아티스트에게 응원이 전달되었습니다" lp="30"></airdrop-lp-modal>
  `,
  styleUrls: [
    '../content.component.scss',
    './content-like.component.scss'
  ]
})
export class AirdropContentLikeComponent implements OnInit, OnChanges {
  @Input() selectedArtist: any;
  @Output() addLP = new EventEmitter<number>();
  @Input() current: number;

  alreadyLiked = false;

  videoUrl: any;

  modalOpen = false;

  constructor(private domSanitizer: DomSanitizer) {
  }

  like() {
    if (this.current === 2) {
      this.modalOpen = true;
      this.alreadyLiked = true;
    }
  }

  ngOnInit() {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.selectedArtist.video);
  }

  add(lp: number) {
    this.addLP.emit(lp);
    this.modalOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (prop === 'selectedArtist' && changes[prop].currentValue !== changes[prop].previousValue) {
        this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.selectedArtist.video);
      }
    }
  }
}
