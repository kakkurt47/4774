import { Component } from '@angular/core';


@Component({
  selector: 'airdrop-event',
  template: `
    <div class="container">
      <h3 class="pt-5 pb-3">Muzika 에어드롭 이벤트</h3>
      <p class="pb-5">
        Muzika를 경험하고 <BR />
        최대 50MZK를 받아가세요!
      </p>
      <airdrop-breadcrumb></airdrop-breadcrumb>
    </div>
  `,
  styleUrls: [
    './event.component.scss'
  ]
})
export class AirdropEventComponent {
}
