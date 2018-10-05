import { AfterViewInit, Component, ElementRef, HostListener, NgZone } from '@angular/core';
import { BaseComponent } from '../../../models/base.component';

declare const jQuery;

@Component({
  selector: 'mzk-intro-business',
  template: `
    <section class="section" id="business">
      <div class="bg-class">
        <h2 class="text-center intro-section-title">
          {{'intro-business.title' | translate}}
        </h2>
        <p class="text-center intro-section-subtitle mt-4"
           [innerHtml]="'intro-business.subtitle' | translate | nl2br"></p>
        <div class="row">
          <div class="col-sm-8">
            <div class="row highlight-box mt-5">
              <div class="col-6 mb-4">
                <div class="highlight-num" data-count="3">3</div>
                <div class="highlight-name text-left">{{'intro-business.year-of-exp' | translate}}</div>
              </div>
              <div class="col-6 mb-4">
                <div class="highlight-num" data-count="150">150 +</div>
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
          <div class="col-sm-4">
            <img src="assets/intro-img/business-preview.png" class="img-fluid pr-sm-0">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .section {
      background: url('assets/intro-img/design/wave-1.png') no-repeat #192538;
      background-size: 100%;
      background-position-y: bottom;
      padding-bottom: 160px;
      margin-bottom: -1px;
    }
    
    .bg-class {
      padding-bottom: 50px;
      background: url('assets/intro-img/design/line-art-1.png') no-repeat;
      background-position-x: 70px;
      background-position-y: 130px;
      background-size: 600px;
      position: relative;
    }

    @media (max-width: 768px) {
      .bg-class {
        padding-bottom: 80px;
      }
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
      text-align: justify;
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
export class MzkIntroBusinessComponent extends BaseComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef,
              private zone: NgZone) {
    super();
  }

  jQueryInstance;
  jQueryHighlightNums: any;

  isOut = true;

  ngAfterViewInit(): void {
    this.jQueryInstance = jQuery(this.elementRef.nativeElement);
    this.jQueryHighlightNums = jQuery('.highlight-num');
    this.animateNums();
  }

  @HostListener('window:scroll.nozone')
  private scrollEvent() {
    const scrollPos = window.scrollY + window.innerHeight;
    const top = this.jQueryInstance.offset().top;
    const bottom = top + this.jQueryInstance.height();
    const isOut = !(scrollPos >= top && scrollPos < bottom);

    if (this.isOut !== isOut && !isOut) {
      this.animateNums();
    }
    this.isOut = isOut;
  }

  private animateNums() {
    this.zone.runOutsideAngular(() => {
      this.jQueryHighlightNums.each(function() {
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
    });
  }
}
