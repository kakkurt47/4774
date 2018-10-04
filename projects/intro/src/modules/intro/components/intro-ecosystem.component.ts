import { Component } from '@angular/core';
import { BaseComponent } from '../../../models/base.component';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
    <section class="section" id="ecosystem">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="intro-section-title">
              {{'intro-ecosystem.title' | translate}}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 mt-5 mx-auto">
            <img src="assets/intro-img/muzika-ecosystem2.gif" class="img-fluid mb-3">
          </div>
        </div>
        
        <div class="d-flex">
          <div class="mt-4 mx-auto">
            <div class="ecosystem-box">
              <p class="intro-section-subtitle">
                {{'intro-ecosystem.subtitle-1' | translate}}
              </p>
              <ol class="desc">
                <li>
                  {{'intro-ecosystem.subtitle-2' | translate}}
                </li>
                <li>
                  {{'intro-ecosystem.subtitle-3' | translate}}
                </li>
                <li>
                  {{'intro-ecosystem.subtitle-4' | translate}}
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <a class="view-more-btn" href="/ecosystem" target="_blank">
            Read More <i class="fa fa-chevron-right"></i>
          </a>
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

    /*
    .intro-section-title {
      font-size: 28px;
      font-weight: 700;
    }
    */

    .intro-section-subtitle {
      font-size: 16px;
    }

    img {
      width: 100%;
    }

    .ecosystem-box {
      display: block;
      width: 750px;
    }

    @media (max-width: 768px) {
      .ecosystem-box {
        width: 100%;
      }

      section {
        padding: 50px 0 30px 0;
      }
    }
    
    .view-more-btn {
      background-color: transparent;
      border: 1px solid #343c4d;
      color: #343c4d;
      padding: 6px 48px;
      outline: none;
      transition-property: color, border-color;
      transition-duration: 0.1s;
      transition-timing-function: linear;
    }
    
    .view-more-btn:hover {
      border-color: #a5adbd;
      color: #a5adbd;
      text-decoration: none;
    }
    
    .view-more-btn:active {
      border-color: #6e778a;
      color: #6e778a;
    }
    
    ol.desc {
      padding-left: 16px;
    }
    
    ol.desc li {
      padding-left: 12px;
      color: #8196b2;
    }
  `]
})
export class MzkIntroEcosystemComponent extends BaseComponent {
  constructor() {
    super();
  }


}
