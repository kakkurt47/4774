import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-business',
  template: `
    <section class="section" id="business">
      <h2 class="text-center intro-section-title">
        OUR BUSINESS
      </h2>
      <p class="text-center intro-section-subtitle mt-4">
        South Korea's largest <BR />
        music platform
      </p>
      <div class="row">
        <div class="col-5">
          <img src="assets/images/business-preview.png" class="img-fluid">
        </div>
        <div class="col-7">
          <div class="row highlight-box mt-5">
            <div class="col-6 mb-5">
              <div class="highlight-num">3</div>
              <div class="highlight-name text-left">Years of experience</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num">170 +</div>
              <div class="highlight-name text-left">User nations</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num">2 Million</div>
              <div class="highlight-name text-left">Users</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num">17K +</div>
              <div class="highlight-name text-left">Artists</div>
            </div>
          </div>
          <p class="highlight-summary">
            Our music platforms(mapianist, mymusicsheet, kpoppiano) <BR />
            reaches 2 million users and subscribers accross <BR />
            over 170 nations, plus artists from over 30 nations
          </p>
        </div>
      </div>
    </section>
  `,
  styleUrls: [
    '../scss/helper.scss'
  ],
  styles: [`
    section {
      padding-bottom: 50px;
    }

    .highlight-summary {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px;
      color: #4d5256;
    }

    .highlight-box {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    
    .highlight-num {
      text-align: left;
      font-size: 2rem;
      color: #18b76f;
      font-weight: 600;
    }
    .highlight-name {
      text-align: left;
      font-size: 1.3rem;
      font-weight: 400;
      color: #4d5256;
    }
    
  `]
})
export class MzkIntroBusinessComponent extends BaseComponent {
  constructor() {
    super();
  }


}
