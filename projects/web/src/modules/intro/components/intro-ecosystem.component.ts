import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
    <div class="triangle-down"></div>
    <section class="section" id="ecosystem">
      <div class="container">
        <div class="row">
          <div class="col-7">
            <h2 class="text-left intro-section-title">
              {{'intro-ecosystem.title' | translate}}
            </h2>
            <p class="text-left intro-section-subtitle pt-4">
              {{'intro-ecosystem.subtitle-1' | translate}}
              <BR/><BR/>
              {{'intro-ecosystem.subtitle-2' | translate}}
            </p>
          </div>
          <div class="col-5">
            <img src="assets/images/diagram-ecosystem.png" class="img-fluid ml-5">
          </div>
        </div>
      </div>
    </section>
    <div class="triangle-down triangle-bottom"></div>
  `,
  styles: [`    
    .triangle-down {
      width: 100%;
      height: 0;
      border-left: 50vw solid transparent;
      border-right: 50vw solid transparent;

      border-top: 100px solid white;
      background-color: #47637c;
    }
    
    .triangle-bottom {
      border-top-color: #47637c;
      background-color: #35495e;
    } 

    section {
      display: block;
      background-color: #47637c;
      padding: 100px 0 60px 0;
    }

    .intro-section-title {
      color: white;
    }

    .intro-section-subtitle { 
      color: #e2dfde;
    }
  `]
})
export class MzkIntroEcosystemComponent extends BaseComponent {
  constructor() {
    super();
  }


}
