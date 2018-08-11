import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval } from 'rxjs';
import { AirdropApi } from '../../airdrop-api';
import { TranslateService } from '@ngx-translate/core';

declare const jQuery;

@Component({
  selector: 'airdrop-content-exchange',
  template: `
    <h4 class="title">
      {{'airdrop.exchange.title' | translate}}
    </h4>
    <div class="exchange-bar">
      <div class="lp-part">
        {{lp}} LP
      </div>
      <div class="exchange-btn tooltip-floating" (click)="exchange()">
        <i class="fal fa-exchange"></i>
        <div class="tooltip-content" [class.hidden]="step >= 1">
          {{'airdrop.exchange.translate' | translate}}
        </div>
      </div>
      <div class="mzk-part">
        {{mzk}} MZK
      </div>
    </div>

    <ul class="lp-desc">
      <li>
        {{'airdrop.exchange.lp-desc' | translate}}
      </li>
      <li>
        {{'airdrop.exchange.lp-desc-2' | translate}}
      </li>
    </ul>

    <div class="receive-box one mt-4">
      <h5 class="text-center">
        {{'airdrop.exchange.wallet-title' | translate}}
      </h5>
      <div class="input-group mt-4">
        <input type="text" class="form-control" [(ngModel)]="eth_address"
               pattern="0x[a-fA-F0-9]{40}" 
               [placeholder]="'airdrop.exchange.wallet-placeholder' | translate" [disabled]="step >= 2">
        <button class="btn btn-default btn-sm" (click)="secondShow()" *ngIf="step < 2">
          {{'airdrop.exchange.wallet-submit' | translate}}
        </button>
      </div>
      <div class="text-danger text-center mt-4"> {{'airdrop.exchange.wallet-warning-message' | translate}}</div>
    </div>

    <div class="receive-box two mt-5">
      <h5 class="text-center">
        {{'airdrop.exchange.receive-code' | translate}}
        <i class="receive-code">{{randomCode}}</i>
      </h5>
      <ul class="mt-4 instruction">
        <li> {{'airdrop.exchange.instruction-1' | translate}}</li>
        <li> {{'airdrop.exchange.instruction-2' | translate}}</li>
        <li> {{'airdrop.exchange.instruction-3' | translate}}</li>
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

  constructor(private api: AirdropApi,
              private translateService: TranslateService) {
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
      return alert(this.translateService.instant('airdrop.exchange.api.already-submitted'));
    }

    if (!confirm(`${this.eth_address}\n` + this.translateService.instant('airdrop.exchange.api.confirm-message'))) {
      return; // 수정 원할 경우 그냥 취소 처리
    }

    this.api.post('/log', {
      eth_address: this.eth_address
    }).subscribe();

    if (!/0x[a-fA-F0-9]{40}/.test(this.eth_address)) {
      return alert(this.translateService.instant('airdrop.exchange.api.invalid-address'));
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
      alert(this.translateService.instant('airdrop.exchange.api.network-error'));
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
