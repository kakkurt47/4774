import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
    <section class="section" id="ecosystem">
      <div class="container">
        <div class="row">
          <div class="col-sm-6  pr-sm-5">
            <img src="assets/intro-img/diagram-ecosystem.png" class="img-fluid mb-3">
          </div>
          <div class="col-sm-6">
            <div class="ecosystem-box">
              <h3 class="text-left intro-section-title">
                {{'intro-ecosystem.title' | translate}}
              </h3>
              <p class="text-left intro-section-subtitle pt-4">
                {{'intro-ecosystem.subtitle-1' | translate}}
                <BR/><BR/>
                {{'intro-ecosystem.subtitle-2' | translate}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`   

    section {
      display: block;
      background-color: white;
      padding: 100px 0 60px 0;
    }
    
    .intro-section-title {
      font-size: 28px;
      font-weight: 700;
    }
    
    .intro-section-subtitle {
      font-size: 16px;
    }
    
    img {
      width: 100%;
    }
    
    .ecosystem-box {
      display: block;
      padding: 55px 45px;
      border-radius: 20px 20px;
    }
    @media(min-width: 738px) {
      .ecosystem-box {
        box-shadow: 4px 4px 20px 4px rgba(20, 85, 195, 0.65);
      }
    }
    
    @media (max-width: 768px) {
      .ecosystem-box {
        padding: 25px 20px;
      }

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
