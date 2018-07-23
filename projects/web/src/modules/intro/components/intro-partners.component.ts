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
          <div class="col-sm-3 col-6">
            <img src="assets/images/partners/logo-blackhorse.png" class="img-fluid">
          </div>
          <div class="col-sm-3 col-6">
            <img src="assets/images/partners/logo-panony.png" class="img-fluid">
          </div>
          <div class="col-sm-3 col-6">
            <div class="empty-box"></div>
          </div>
          <div class="col-sm-3 col-6">
            <div class="empty-box"></div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-3 col-6">
            <div class="empty-box"></div>
          </div>
          <div class="col-sm-3 col-6">
            <div class="empty-box"></div>
          </div>
          <div class="col-sm-3 col-6">
            <div class="empty-box"></div>
          </div>
          <div class="col-sm-3 col-6">
            <div class="empty-box"></div>
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
    
    .empty-box {
      display: block;
      background: white;
      margin-top: 40px;
      text-align: center;
      width: 100%;
      height: 100%;
      border-radius: 8px 8px;
      min-height: 110px;
    }
    
    @media(max-width: 738px) {
      .empty-box {
        min-height: 50px;
      }
    }
  `]
})
export class MzkIntroPartnersComponent extends BaseComponent {
  constructor() {
    super();
  }


}
