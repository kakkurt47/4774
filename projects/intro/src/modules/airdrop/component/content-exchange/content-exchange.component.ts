import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval } from 'rxjs';
import { AirdropApi } from '../../airdrop-api';

declare const jQuery;

@Component({
  selector: 'airdrop-content-exchange',
  template: `
    <h4 class="title">
      LP를 MZK로 전환하세요!
    </h4>
    <div class="exchange-bar">
      <div class="lp-part">
        {{lp}} LP
      </div>
      <div class="exchange-btn tooltip-floating" (click)="exchange()">
        <i class="fal fa-exchange"></i>
        <div class="tooltip-content" [class.hidden]="step >= 1">
          전환
        </div>
      </div>
      <div class="mzk-part">
        {{mzk}} MZK
      </div>
    </div>

    <ul class="lp-desc">
      <li>
        LP(Loyalty Point)는 여러분의 커뮤니티 내 기여도를 나타내며, LP는 MZK로 교환됩니다.
      </li>
      <li>
        더 많은 LP를 획득할수록 여러분은 커뮤니티에 더 많은 영향력을 갖게 됩니다.
      </li>
    </ul>

    <div class="receive-box one mt-4">
      <h5 class="text-center">
        MyEtherWallet 이더리움 지갑 주소를 입력해주세요.
      </h5>
      <div class="input-group mt-4">
        <input type="text" class="form-control" [(ngModel)]="eth_address"
               pattern="0x[a-fA-F0-9]{40}" 
               placeholder="지갑 주소 입력하기" [disabled]="step >= 2">
        <button class="btn btn-default btn-sm" (click)="secondShow()" *ngIf="step < 2">
          확인
        </button>
      </div>
      <div class="text-danger text-center mt-4"> 주소가 없거나, 거래소 지갑 주소인 경우 수령하실 수 없습니다.</div>
    </div>

    <div class="receive-box two mt-5">
      <h5 class="text-center">
        본인 확인용 수령코드
        <i class="receive-code">{{randomCode}}</i>
      </h5>
      <ul class="mt-4 instruction">
        <li> 텔래그램 (https://t.me/muzika_korean)에 입장 후 수령코드를 남겨주셔야 중복 확인 후 지급됩니다.</li>
        <li> MZK코인은 상장 이전에 입력하신 지갑 주소로 분배 될 예정이며, 구체적인 일정은 텔래그램을 통해 공지해드리겠습니다.</li>
        <li> 텔래그램 그룹에서 MZK 상장 등 여러 소식을 확인하세요. 감사합니다.</li>
      </ul>
    </div>
  `,
  styleUrls: [
    '../content.component.scss',
    './content-exchange.component.scss'
  ]
})
export class AirdropContentExchangeComponent {
  @Input() lp = 0;

  @Input() randomCode: string;

  @Input() secretKey: string;

  @Output() changeBudget = new EventEmitter();

  eth_address: string;

  step = 0;

  mzk = 0;

  constructor(private api: AirdropApi) {
  }

  exchange() {
    if (this.step !== 0) {
      return;
    }
    const sub = interval(30)
      .subscribe(i => {
        this.step = 1;
        this.lp -= 1;
        this.mzk = Math.floor((i + 1) / 5);
        this.changeBudget.emit({
          lp: this.lp,
          mzk: this.mzk
        });
        if (this.lp <= 0) {
          sub.unsubscribe();
          jQuery('.receive-box.one').show('slow');
        }
      });
  }

  // step change from 1 to 2
  secondShow() {
    if (this.step !== 1) {
      return alert('이미 지갑 주소를 입력하셨습니다.');
    }

    if (!confirm(`정말 지갑 주소가 ${this.eth_address}이 맞나요? 한번 입력되면 변경할 수 없습니다.`)) {
      return; // 수정 원할 경우 그냥 취소 처리
    }

    this.api.post('/exchange', {
      secret_key: this.secretKey,
      eth_address: this.eth_address
    }).subscribe(res => {
      this.step = 2;

      jQuery('.receive-box.two').show('slow');
      jQuery('.instruction li').each((index, tag) => {
        const timing = index * 1300;
        setTimeout(() => {
          jQuery(tag).show('slow');
        }, timing);
      });
    }, () => {
      alert('네트워크가 불안정하거나 회원님의 브라우저 보안이 불안정하여 이더리움 지갑 주소를 저장할 수 없습니다.\n번거로우시겠지만 다른 컴퓨터/기기를 통해 이용 부탁드립니다.');
    });
  }

  copy() {
    const copyText = jQuery('.receive-code');

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand('copy');
  }
}
