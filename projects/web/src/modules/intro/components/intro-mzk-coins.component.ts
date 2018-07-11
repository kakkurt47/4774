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
        <p class="intro-section-subtitle mt-4 mb-3">
          {{'intro-mzk-coins.subtitle-1' | translate}}<BR/> <BR/>
          {{'intro-mzk-coins.subtitle-2' | translate}}
        </p>
        <img src="assets/images/diagram-coin.png" class="mt-sm-5 img-fluid mb-sm-5">
        <BR/>
        <BR/>
        <h2 class="mt-5 text-center intro-section-title mb-5">{{'intro-mzk-coins.major-functions' | translate}}</h2>
        <div class="row">
          <div class="col-6">
            <h4 class="function-title">{{'intro-mzk-coins.func-1-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-1-desc-1' | translate}} <BR />
              {{'intro-mzk-coins.func-1-desc-2' | translate}}
            </p>
          </div>
          <div class="col-6">
            <h4 class="function-title">{{'intro-mzk-coins.func-2-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-2-desc-1' | translate}}
              {{'intro-mzk-coins.func-2-desc-2' | translate}}
            </p>
          </div>
          <div class="col-6">
            <h4 class="function-title">{{'intro-mzk-coins.func-3-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-3-desc-1' | translate}}
              {{'intro-mzk-coins.func-3-desc-2' | translate}}
            </p>
          </div>
          <div class="col-6">
            <h4 class="function-title">{{'intro-mzk-coins.func-4-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-4-desc-1' | translate}}
              {{'intro-mzk-coins.func-4-desc-2' | translate}}
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="triangle-down"></div>
  `,
  styles: [`
    .triangle-down {
      width: 100%;
      height: 0;
      border-left: 50vw solid transparent;
      border-right: 50vw solid transparent;

      border-top: 100px solid #d5dbe0;
      background-color: #f8fafb;
    }

    section {
      background-color: #d5dbe0;
      padding: 100px 0;
    }

    @media (max-width: 768px) {
      section {
        padding: 50px 0;
      }
    }

    .intro-section-subtitle {
      color: #4d5256;
      max-width: 530px;
    }

    .function-title {
      font-size: 22px;
      text-align: center;
      padding: 15px 0;
      border-bottom: 2px solid #18b76f;
      color: #4d5256;
    }

    .function-desc {
      margin: 0 auto;
      padding: 10px 0 30px 0;
      max-width: 466px;
      font-size: 15px;
      text-align: center;
      color: #878d91;
    }
  `]
})
export class MzkIntroMZKCoinComponent extends BaseComponent {
  constructor() {
    super();
  }


}
