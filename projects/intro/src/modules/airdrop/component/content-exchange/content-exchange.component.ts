import { Component, Input } from '@angular/core';
import { interval } from 'rxjs';

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
      <div class="exchange-btn" (click)="exchange()">
        <i class="fal fa-exchange"></i>
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
    
    <div class="receive-box mt-4">
      <h5 class="text-center">
        수령코드 
        <i class="receive-code">{{randomCode}}</i>
      </h5>
      <input type="text" class="form-control mt-4" placeholder="이더리움 지갑 주소 입력하기">
      <ul class="mt-4">
        <li> MyEtherWallet 지갑 주소를 입력해주세요. </li>
        <li> 텔레그램 (https://t.me/muzika_korean)에 입장 후 수령코드를 남겨주셔야 중복 확인 후 지급됩니다. </li>
        <li> MZK코인은 상장 이전에 입력하신 지갑 주소로 분배 될 예정이며, 구체적인 일정은 텔래그램을 통해 공지해드리겠습니다. </li>
        <li> 텔래그램 그룹에서 MZK 상장 등 여러 소식을 확인하세요. 감사합니다. </li>
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

  isStart = false;

  mzk = 0;

  exchange() {
    if (this.isStart) {
      return;
    }
    const previousLP = this.lp;
    const sub = interval(50)
      .subscribe(i => {
        this.isStart = true;
        this.lp -= 1;
        this.mzk = Math.floor((i + 1) / 5);
        if (this.lp === 0) {
          sub.unsubscribe();
        }
      });
  }
}
