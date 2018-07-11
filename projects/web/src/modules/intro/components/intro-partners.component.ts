import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-partners',
  template: `
    <section class="section" id="investor">
      <div class="container">
        <h2 class="text-center intro-section-title">
          PARTNERS
        </h2>
        <div class="row mt-5">
          <div class="col-sm-4 col-6">
            <img src="assets/images/partners/logo-blackhorse.png" class="img-fluid">
          </div>
          <div class="col-sm-4 col-6">
            <img src="assets/images/partners/logo-panony.png" class="img-fluid">
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
      background: #f8fafb;
      border-radius: 8px 8px;
    }
  `]
})
export class MzkIntroPartnersComponent extends BaseComponent {
  constructor() {
    super();
  }


}
