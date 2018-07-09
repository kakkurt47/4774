import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-investor',
  template: `
    <section class="section" id="investor">
      <div class="container">
        <h2 class="text-center intro-section-title">
          INVESTORS
        </h2>
        <div class="row mt-5">
          <div class="col-3">
            <img src="assets/images/investors/logo-blackhorse.png" class="img-fluid">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      display: block;
      background-color: #f8fafb;
      padding: 100px 0;
    }

    img {
      background: white;
      border-radius: 8px 8px;
    }
  `]
})
export class MzkIntroInvestorComponent extends BaseComponent {
  constructor() {
    super();
  }


}
