import { Component } from '@angular/core';
import { BaseComponent } from '../../../models/base.component';

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
            <mzk-intro-countdown [expiredDate]="expiredDates[0]"></mzk-intro-countdown>
          </div>
          <div class="col-sm-3 col-6">
            <mzk-intro-countdown [expiredDate]="expiredDates[1]"></mzk-intro-countdown>
          </div>
          <div class="col-sm-3 col-6">
            <mzk-intro-countdown [expiredDate]="expiredDates[2]"></mzk-intro-countdown>
          </div>
          <div class="col-sm-3 col-6">
            <mzk-intro-countdown [expiredDate]="expiredDates[3]"></mzk-intro-countdown>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="row mt-sm-4">
          <div class="col-sm-3 col-6">
            <mzk-intro-countdown [expiredDate]="expiredDates[4]"></mzk-intro-countdown>
          </div>
          <div class="col-sm-3 col-6">
            <mzk-intro-countdown [expiredDate]="expiredDates[5]"></mzk-intro-countdown>
          </div>
          <div class="col-sm-3 col-6">
            <img src="assets/intro-img/partners/logo-blackhorse.png" class="img-fluid">
          </div>
          <div class="col-sm-3 col-6">
            <img src="assets/intro-img/partners/logo-panony.png" class="img-fluid">
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
      box-shadow: 0 2px 5px rgba(0, 0, 0, .03);
    }

    .empty-box {
      display: block;
      background: white;
      padding-top: 40px;
      text-align: center;
      width: 100%;
      height: 100%;
      border-radius: 8px 8px;
      min-height: 110px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, .03);
    }

    @media (max-width: 738px) {
      section {
        padding: 50px 0;
      }

      .empty-box {
        padding-top: 0;
        height: 56px;
        margin-top: 30px;
        min-height: 56px;
      }
    }
  `]
})
export class MzkIntroPartnersComponent extends BaseComponent {
  expiredDates: Date[] = [
    new Date('2018-08-03T00:00:00'),
    new Date('2018-08-06T00:00:00'),
    new Date('2018-08-10T00:00:00'),
    new Date('2018-08-13T00:00:00'),
    new Date('2018-08-17T00:00:00'),
    new Date('2018-08-20T00:00:00'),
  ];

  constructor() {
    super();
  }
}
