import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-mzk-coins',
  template: `
    <section class="section" id="mzk-coins">
      <div class="container">
        <h2 class="intro-section-title">
          The MZK Coin
        </h2>
        <p class="intro-section-subtitle mb-3">
          Muzika coin(MZK) was deliberately designed as the backbone of this new ecosystem.
          The team has analyzed both successful and failed cryptocurrencies, past and present,
          and learning the lessons of the industry have a clear vision of what is necessary to make this project a success. <BR/> <BR/>
          MZK will serve as the sole medium of exchange for all economic activity within the ecosystem, facilitating investments, trades,
          and the allocation of investment returns, all while assisting growth via a few free services targeted at community novices.
        </p>
        <img src="assets/images/diagram.png" class="mt-5 img-fluid">
      </div>
    </section>
  `,
  styles: [`
    section {
      background-color: #35495e;
      padding: 100px 0;
    }
    .intro-section-title {
      color: #fff;
    }
    .intro-section-subtitle {
      color: #e2dfde;
      max-width: 530px;
    }
  `]
})
export class MzkIntroMZKCoinComponent extends BaseComponent {
  constructor() {
    super();
  }


}
