import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'airdrop-content-subscribe',
  template: `
    <div class="title">
      Muzika에 오신 것을 환영합니다. <BR />
      당신의 아티스트를 구독해주세요!
    </div>
    <div class="artist-list">
      <div class="artist-row" *ngFor="let artist of artistList">
        <img [src]="'assets/airdrop/artist/' + artist.imgPath">
        <span class="name">{{artist.name}}</span>
        <button type="button" class="subscribe" (click)="modalOpen = true; selectedArtist.emit(artist);">
          +구독
        </button>
      </div>
    </div>
    <airdrop-lp-modal [class.close]="!modalOpen"
                      (addLP)="add($event)"
                      message="구독이 완료되었습니다" lp="20"></airdrop-lp-modal>
  `,
  styleUrls: [
    '../content.component.scss',
    './content-subscribe.component.scss'
  ]
})
export class AirdropContentSubscribeComponent {
  @Output() addLP = new EventEmitter<number>();
  @Output() selectedArtist = new EventEmitter<any>();

  modalOpen = false;

  artistList: {
    name: string,
    imgPath: string,
    video: string,
    title: string
  }[] = [
    {
      name: '트와이스',
      imgPath: 'twice.png',
      video: 'https://www.youtube.com/embed/i0p1bmr0EmE?autoplay=1',
      title: 'Twice - Day with the light'
    },
    {
      name: '비욘세',
      imgPath: 'beyonce.png',
      video: 'https://www.youtube.com/embed/Ob7vObnFUJc?autoplay=1',
      title: 'Beyonce - Love on top'
    },
    {
      name: '방탄소년단',
      imgPath: 'bts.png',
      video: 'https://www.youtube.com/embed/7C2z4GqqS5E?autoplay=1',
      title: 'BTS - Fake Love'
    },
    {
      name: '브루노마스',
      imgPath: 'bruno-mars.png',
      video: 'https://www.youtube.com/embed/OPf0YbXqDm0a?autoplay=1',
      title: 'Bruno Mars - Uptown Funk'
    },
    {
      name: 'J Fla',
      imgPath: 'j-fla.png',
      video: 'https://www.youtube.com/embed/MhQKe-aERsU?autoplay=1',
      title: 'J-Fla - Shape of you'
    }
  ];

  add(lp: number) {
    this.addLP.emit(lp);
  }
}
