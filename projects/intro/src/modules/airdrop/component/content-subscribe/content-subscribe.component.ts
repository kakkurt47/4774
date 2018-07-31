import { Component, EventEmitter, Output } from '@angular/core';
import { AirdropApi } from '../../airdrop-api';

@Component({
  selector: 'airdrop-content-subscribe',
  template: `
    <div class="title">
      {{'airdrop.subscribe.desc-1' | translate}} <BR/>
      {{'airdrop.subscribe.desc-2' | translate}}
    </div>
    <div class="artist-list">
      <div class="artist-row" *ngFor="let artist of artistList">
        <img [src]="'assets/airdrop/artist/' + artist.imgPath">
        <span class="name">{{artist.name}}</span>
        <button type="button" class="subscribe" (click)="select(artist)">
          +{{'airdrop.subscribe.subscribe-text' | translate}}
        </button>
      </div>
    </div>
    <airdrop-lp-modal [class.close]="!modalOpen"
                      (addLP)="add($event)"
                      [message]="'airdrop.subscribe.lp-modal-message' | translate" lp="20"></airdrop-lp-modal>
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
    musician: string,
    name: string,
    imgPath: string,
    video: string,
    title: string,
    cnt: number
  }[] = [
    {
      musician: 'twice',
      name: '트와이스',
      imgPath: 'twice.png',
      video: 'https://www.youtube.com/embed/i0p1bmr0EmE?autoplay=1',
      title: 'Twice - What is Love?',
      cnt: 0
    },
    {
      musician: 'beyonce',
      name: '비욘세',
      imgPath: 'beyonce.png',
      video: 'https://www.youtube.com/embed/Ob7vObnFUJc?autoplay=1',
      title: 'Beyonce - Love on top',
      cnt: 0
    },
    {
      musician: 'bts',
      name: '방탄소년단',
      imgPath: 'bts.png',
      video: 'https://www.youtube.com/embed/7C2z4GqqS5E?autoplay=1',
      title: 'BTS - Fake Love',
      cnt: 0
    },
    {
      musician: 'bruno_mars',
      name: '브루노마스',
      imgPath: 'bruno-mars.png',
      video: 'https://www.youtube.com/embed/OPf0YbXqDm0?autoplay=1',
      title: 'Bruno Mars - Uptown Funk',
      cnt: 0
    },
    {
      musician: 'j-fla',
      name: 'J Fla',
      imgPath: 'j-fla.png',
      video: 'https://www.youtube.com/embed/MhQKe-aERsU?autoplay=1',
      title: 'J-Fla - Shape of you',
      cnt: 0
    }
  ];

  constructor(private api: AirdropApi) {
  }

  add(lp: number) {
    this.addLP.emit(lp);
  }

  select(artist) {
    this.modalOpen = true;
    this.selectedArtist.emit(artist);
  }

  ngOnInit() {
    this.api.get<{
      cnt: number,
      musician: string
    }[]>('/subscribe').subscribe(result => {
      result.forEach(artist => {
        const foundArtist = this.artistList.find(_artist => artist.musician === _artist.musician);
        if (foundArtist) {
          foundArtist.cnt = artist.cnt;
        }
      });
    });
  }
}
