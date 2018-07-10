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
        Global No. 1 Instrumental Music Platform 
      </p>
      <div class="row">
        <div class="col-5">
          <img src="assets/images/business-preview.png" class="img-fluid mt-5">
        </div>
        <div class="col-7">
          <div class="row highlight-box mt-5">
            <div class="col-6 mb-4">
              <div class="highlight-num">3</div>
              <div class="highlight-name text-left">Years of experience</div>
            </div>
            <div class="col-6 mb-4">
              <div class="highlight-num">170 +</div>
              <div class="highlight-name text-left">User nations</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num">2,000,000 +</div>
              <div class="highlight-name text-left">Users</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num">17,000 +</div>
              <div class="highlight-name text-left">Artists</div>
            </div>
          </div>
          <h4 class="highlight-title mb-3">What makes Muzika unique</h4>
          <p class="highlight-summary">
            Unlike hundreds of ICOs without proof of practicality, Muzika is not starting from scratch.
            The token economy is strongly built on the backs of our existing, profit-generating, and privately & publicly funded business
            with 2,000,000 active users & subscribers from 170+ nations and artists from 30+ nations. <BR /><BR />
            Through years of experience, we have learned the precise ways to build a community run by loyal and 
            incentivized individuals: a key to success of any community-based ICO projects.
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
      background-color: #f8fafb;
      padding-bottom: 50px;
    }
    
    .highlight-title {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px;
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
