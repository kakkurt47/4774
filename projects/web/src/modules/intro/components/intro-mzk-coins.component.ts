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
        <img src="assets/images/diagram-coin.png" class="mt-5 img-fluid">
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
  `]
})
export class MzkIntroMZKCoinComponent extends BaseComponent {
  constructor() {
    super();
  }


}
