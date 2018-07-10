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
        <img src="assets/images/diagram.png" class="mt-5 img-fluid">
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

      border-top: 100px solid #35495e;
      background-color: #f8fafb;
    }
    
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
