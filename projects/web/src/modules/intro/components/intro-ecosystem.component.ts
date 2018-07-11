import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
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
            <img src="assets/images/diagram-ecosystem.png" class="img-fluid ml-sm-5">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`   

    section {
      display: block;
      background-color: #5a6d86;
      padding: 100px 0 60px 0;
    }
    
    .intro-section-title, .intro-section-subtitle {
      color: white;
    }
    
    img {
      max-width: 350px;
      width: 100%;
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
