import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
    <div class="triangle-down"></div>
    <section class="section" id="ecosystem">
      <div class="container">
        <div class="row">
          <div class="col-sm-7">
            <h2 class="text-left intro-section-title">
              {{'intro-ecosystem.title' | translate}}
            </h2>
            <p class="text-left intro-section-subtitle pt-4">
              {{'intro-ecosystem.subtitle-1' | translate}}
              <BR/><BR/>
              {{'intro-ecosystem.subtitle-2' | translate}}
            </p>
          </div>
          <div class="col-sm-5">
            <img src="assets/images/diagram-ecosystem2.png" class="img-fluid ml-sm-5">
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
      background-color: #f8fafb;
    }
    
    .triangle-bottom {
      border-top-color: #f8fafb;
      background-color: #d5dbe0;
    } 

    section {
      display: block;
      background-color: #f8fafb;
      padding: 100px 0 60px 0;
    }
    
    @media (max-width: 768px) {
      section {
        padding: 50px 0 30px 0;
      }
    }
  `]
})
export class MzkIntroEcosystemComponent extends BaseComponent {
  constructor() {
    super();
  }


}
