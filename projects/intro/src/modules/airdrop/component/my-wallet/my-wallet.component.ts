import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

declare const jQuery;

@Component({
  selector: 'airdrop-my-wallet',
  template: `
    <h5 class="mb-3">내 지갑</h5>
    <p>
      <span class="loyaltyPoint">0</span> <span class="currency">LP</span>
    </p>
    <p>
      <span class="mzk">0</span> <span class="currency">MZK</span>
    </p>
  `,
  styleUrls: [
    './my-wallet.component.scss'
  ]
})
export class AirdropMyWalletComponent implements OnChanges {
  @Input() loyaltyPoint = 0;
  @Input() mzk = 0;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (changes[prop].currentValue !== changes[prop].previousValue) {
        const $this = jQuery(this.elementRef.nativeElement.querySelector('.' + prop));
        jQuery({ countNum: changes[prop].previousValue }).animate({ countNum: changes[prop].currentValue }, {
          duration: 1000,
          easing: 'linear',
          step: function() {
            $this.text(Math.floor(this.countNum).toLocaleString());
          },
          complete: function() {
            $this.text(this.countNum.toLocaleString());
          }
        });
      }
    }
  }
}
