import { Component, ElementRef, HostListener } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

declare const jQuery;

@Component({
  selector: 'mzk-intro-business',
  template: `
    <img src="assets/images/design/wave-2.png" width="100%">
    <section class="section" id="business">
      <h2 class="text-center intro-section-title">
        OUR BUSINESS
      </h2>
      <p class="text-center intro-section-subtitle mt-4">
        {{'intro-business.subtitle' | translate}}
      </p>
      <div class="row">
        <div class="col-sm-7">
          <div class="row highlight-box mt-5">
            <div class="col-6 mb-4">
              <div class="highlight-num" data-count="3">3</div>
              <div class="highlight-name text-left">{{'intro-business.year-of-exp' | translate}}</div>
            </div>
            <div class="col-6 mb-4">
              <div class="highlight-num" data-count="170">170 +</div>
              <div class="highlight-name text-left">{{'intro-business.user-nations' | translate}}</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num" data-count="2000000">2,000,000 +</div>
              <div class="highlight-name text-left">{{'intro-business.users' | translate}}</div>
            </div>
            <div class="col-6 mb-5">
              <div class="highlight-num" data-count="17000">17,000 +</div>
              <div class="highlight-name text-left">{{'intro-business.artists' | translate}}</div>
            </div>
          </div>
          <h4 class="highlight-title mb-3">{{'intro-business.what-makes-muzika-unique' | translate}}</h4>
          <p class="highlight-summary">
            {{'intro-business.highlight-text-1' | translate}}<BR/><BR/>
            {{'intro-business.highlight-text-2' | translate}}
          </p>
        </div>
        <div class="col-sm-5">
          <img src="assets/images/business-preview.png" class="img-fluid mt-5 pr-sm-0 pr-5">
        </div>
      </div>
    </section>
  `,
  styleUrls: [
    '../scss/helper.scss'
  ],
  styles: [`
    section {
      padding-bottom: 50px;
      background: url('assets/images/design/line-art-0.png') no-repeat #192538;
      background-position-x: 100px;
      background-position-y: 130px;
      background-size: 600px;
      position: relative;
    }
    
    .intro-section-title {
      color: white;
    }

    .highlight-title {
      color: white;
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .highlight-summary {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px;
      color: #8196b2;
    }

    .highlight-box {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    .highlight-num {
      text-align: left;
      font-size: 2rem;
      color: #76dbc7;
      font-weight: 600;
    }

    .highlight-name {
      text-align: left;
      font-size: 1.3rem;
      font-weight: 400;
      color: white;
    }
    
    img {
      transform: scaleX(-1);
    }

    @media (max-width: 768px) {
      .highlight-title {
        font-size: 20px;
      }

      .highlight-num {
        font-size: 20px;
      }

      .highlight-name {
        font-size: 16px;
      }
    }

  `]
})
export class MzkIntroBusinessComponent extends BaseComponent {
  constructor(private elementRef: ElementRef) {
    super();
  }

  @HostListener('window:scroll', ['$event'])
  scrollEvent(event) {
    if (window.scrollY + window.innerHeight < jQuery(this.elementRef.nativeElement).offset().top) {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    jQuery('.highlight-num').each(function() {
      const $this = jQuery(this),
        countTo = $this.attr('data-count');

      jQuery({ countNum: $this.text() }).animate({
          countNum: countTo
        },
        {
          duration: 3000,
          easing: 'linear',
          step: function() {
            $this.text(Math.floor(this.countNum).toLocaleString());
          },
          complete: function() {
            $this.text(this.countNum.toLocaleString() + '+');
          }
        });
    });
  }
}
