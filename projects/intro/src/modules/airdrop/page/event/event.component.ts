import { Component, OnInit } from '@angular/core';
import { AirdropApi } from '../../airdrop-api';


@Component({
  selector: 'airdrop-event',
  template: `
    <app-intro-navbar></app-intro-navbar>
    <div class="container">
      <airdrop-my-wallet [(loyaltyPoint)]="lp" [(mzk)]="mzk"></airdrop-my-wallet>

      <h3 class="pt-5 pb-2 pb-sm-3">Muzika 에어드롭 이벤트</h3>

      <p class="pb-4 pb-sm-5">
        Muzika를 경험하고 <BR/>
        최대 20MZK를 받아가세요!
      </p>
      <airdrop-breadcrumb [(current)]="contentStep"></airdrop-breadcrumb>

      <airdrop-content-subscribe *ngIf="contentStep === 1"
                                 (selectedArtist)="artistSubscribe($event)"
                                 (addLP)="next(2, $event)"></airdrop-content-subscribe>
      <airdrop-content-like *ngIf="contentStep >= 2 && contentStep <= 3"
                            [(current)]="contentStep"
                            [(selectedArtist)]="selectedArtist"
                            (addLP)="nextWithHandling(contentStep + 1, $event)"></airdrop-content-like>
      <airdrop-content-exchange [randomCode]="randomCode" [secretKey]="secretKey"
                                (changeBudget)="changeBudget($event)"
                                [lp]="lp" *ngIf="contentStep === 4"></airdrop-content-exchange>
      <p class="small pt-4">
        본 화면에 제시된 인터페이스는 실제 Muzika 플랫폼과 차이가 있을 수 있으며, Muzika팀은 예시된 아티스트들이 Muzika 플랫폼에서 활동할 것을 보장하지 않습니다.
      </p>
    </div>
  `,
  styleUrls: [
    './event.component.scss'
  ]
})
export class AirdropEventComponent implements OnInit {
  contentStep = 1;
  lp = 0;
  mzk = 0;
  selectedArtist;

  randomCode: string;
  secretKey: string;
  participantCnt: number;

  constructor(private api: AirdropApi) {
  }

  artistSubscribe(artist) {
    this.selectedArtist = artist;
    console.log(artist);
    this.api.post<string>('/subscribe', {
      secret_key: this.secretKey,
      musician: artist.musician
    }).subscribe(new_secret_key => {
      this.secretKey = new_secret_key;
    });
  }

  nextWithHandling(step, event) {
    if (event.lp) {
      this.next(step, event.lp);
    }
    if (event.comment) {
      this.api.post<string>('/comment', {
        secret_key: this.secretKey,
        content: event.comment
      }).subscribe(res => {
        this.secretKey = res;
      });
    }
  }

  next(step, gainedLP) {
    this.contentStep = step;
    this.lp = this.lp + +gainedLP;
  }

  changeBudget(budget: { lp: number, mzk: number }) {
    this.lp = budget.lp;
    this.mzk = budget.mzk;
  }

  ngOnInit(): void {
    this.api.get<{ random_code: string, secret_key: string, participant_cnt: number }>('/start')
      .subscribe(result => {
        this.randomCode = result.random_code;
        this.secretKey = result.secret_key;
        this.participantCnt = result.participant_cnt;
      });
  }
}
