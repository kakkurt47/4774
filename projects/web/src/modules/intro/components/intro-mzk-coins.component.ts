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
        <img src="assets/intro-img/diagram_coin_pc.png" class="mt-sm-5 img-fluid mb-sm-5 hidden-pc">
        <img src="assets/intro-img/diagram_coin_mobile.png" class="mt-sm-5 img-fluid mb-sm-5 hidden-mb">
        <BR/>
        <BR/>
        <h2 class="mt-5 text-center intro-section-title mb-5">{{'intro-mzk-coins.major-functions' | translate}}</h2>
        <div class="row pt-4">
          <div class="col-12 col-sm-6 mb-sm-4">
            <div class="text-center">
              <img class="function-img" src="assets/intro-img/mzk-coins/icon_1.png">
            </div>
            <h4 class="function-title">{{'intro-mzk-coins.func-1-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-1-desc-1' | translate}} <BR/>
              {{'intro-mzk-coins.func-1-desc-2' | translate}}
            </p>
          </div>
          <div class="col-12 col-sm-6 mb-sm-4">
            <div class="text-center">
              <img class="function-img" src="assets/intro-img/mzk-coins/icon_2.png">
            </div>
            <h4 class="function-title">{{'intro-mzk-coins.func-2-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-2-desc-1' | translate}}
              {{'intro-mzk-coins.func-2-desc-2' | translate}}
            </p>
          </div>
          <div class="col-12 col-sm-6">
            <div class="text-center">
              <img class="function-img" src="assets/intro-img/mzk-coins/icon_3.png">
            </div>
            <h4 class="function-title">{{'intro-mzk-coins.func-3-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-3-desc-1' | translate}}
              {{'intro-mzk-coins.func-3-desc-2' | translate}}
            </p>
          </div>
          <div class="col-12 col-sm-6">
            <div class="text-center">
              <img class="function-img" src="assets/intro-img/mzk-coins/icon_4.png">
            </div>
            <h4 class="function-title">{{'intro-mzk-coins.func-4-title' | translate}}</h4>
            <p class="function-desc">
              {{'intro-mzk-coins.func-4-desc-1' | translate}}
              {{'intro-mzk-coins.func-4-desc-2' | translate}}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      background-color: white;
      padding: 100px 0;
    }
    
    .hidden-mb {
      display: none;
    }

    @media (max-width: 768px) {
      .hidden-pc {
        display: none;
      }
      
      .hidden-mb {
        display: block;
      }
      
      section {
        padding: 50px 0;
      }
    }

    .intro-section-title {
      text-align: center;
    }

    .intro-section-subtitle {
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }

    .function-img {
      width: 95px;
      height: 95px;
      margin: 0 auto;
    }

    .function-title {
      font-size: 20px;
      text-align: center;
      padding: 15px 0;
      border-bottom: 2px solid #35e8c6;
      color: #343c4d;
    }

    .function-desc {
      margin: 0 auto;
      padding: 10px 0 30px 0;
      max-width: 466px;
      font-size: 15px;
      text-align: center;
      color: #8196b2;
    }
  `]
})
export class MzkIntroMZKCoinComponent extends BaseComponent {
  constructor() {
    super();
  }


}
