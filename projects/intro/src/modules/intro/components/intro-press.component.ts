import { Component, ElementRef, HostListener } from '@angular/core';
import { BaseComponent } from '../../../models/base.component';

declare const jQuery;

@Component({
  selector: 'mzk-intro-press',
  template: `
    <section class="section" id="press">
      <div class="container">
        <div class="row">
          <div class="col-sm-5 pr-sm-5">
            <h2 class="text-center text-sm-left intro-section-title">
              PRESS
            </h2>
            
            <p class="text-center text-sm-left intro-section-subtitle mt-4 mb-3"
               [innerHtml]="'intro-press.description' | translate | nl2br"></p>
          </div>
          <div class="col-sm-7 press-link">
            <div class="row">
              <div class="col-md-3 col-sm-4 col-6" *ngFor="let press of presses">
                <a [href]="press.link" class="press-logo" 
                   target="_blank"><img class="press-logo-img" [src]="pressImgSrcPath + press.src"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      /*
      background: url(assets/intro-img/design/wave-4.png) no-repeat;
      background-size: 100%;
      background-position-y: bottom;
      padding-bottom: 180px;
      */
      background-color: white;
      position: relative;
    }

    .press-logo {
      display: inline-block;
    }
    
    .intro-section-title {
      color: #343c4d;
    }
    
    .press-logo-img {
      width: 100%;
      margin-top: 24px;
    }

    @media (max-width: 991px) {
      .section {
        padding-bottom: 80px;
      }
    }
    
    @media (max-width: 575px) {
      .press-logo {
        padding: 0 24px;
      }
    }
  `]
})
export class MzkIntroPressComponent extends BaseComponent {
  pressImgSrcPath = 'assets/intro-img/press/';

  presses: {src: string, link: string}[] = [
    {
      src: 'logo-market-watch.png',
      // tslint:disable-next-line
      link: 'https://www.marketwatch.com/press-release/blockchain-startup-muzika-backed-by-south-korean-tech-giants-kakao-and-naver-to-revolutionize-music-industry-2018-08-06'
    },
    {
      src: 'logo-business-insider.png',
      // tslint:disable-next-line
      link: 'https://markets.businessinsider.com/news/stocks/blockchain-startup-muzika-backed-by-south-korean-tech-giants-kakao-and-naver-to-revolutionize-music-industry-1027433467'
    },
    {
      src: 'logo-yahoo-finance.png',
      // tslint:disable-next-line
      link: 'https://finance.yahoo.com/news/blockchain-startup-muzika-backed-south-104700455.html'
    },
    {
      src: 'logo-blockchain-news.png',
      // tslint:disable-next-line
      link: 'https://www.the-blockchain.com/2018/08/28/muzika-attracts-industry-leaders-in-korean-music-and-tech-scene-to-advisory-board/'
    },
    {
      src: 'logo-ccn.png',
      // tslint:disable-next-line
      link: 'https://www.ccn.com/korean-consortium-blockchain-to-revolutionize-music-muzika-attracts-2-million-users-and-high-profile-investors/'
    },
    {
      src: 'logo-fenghuang.png',
      // tslint:disable-next-line
      link: 'http://biz.ifeng.com/a/20180731/45094179_0.shtml'
    },
    {
      src: 'logo-huoxing.png',
      // tslint:disable-next-line
      link: 'http://www.huoxing24.com/liveNewsDetail/20180806211751888293.html'
    },
    {
      src: 'logo-jingse.png',
      // tslint:disable-next-line
      link: 'https://www.jinse.com/lives/44338.htm'
    },
    {
      src: 'logo-sina.png',
      // tslint:disable-next-line
      link: 'https://t.cj.sina.com.cn/articles/view/5379320436/140a1ea7400100a4n9'
    },
    {
      src: 'logo-tencent-news.png',
      // tslint:disable-next-line
      link: 'http://view.inews.qq.com/a/20180731A135QN00'
    },
    {
      src: 'logo-digital-times.png',
      // tslint:disable-next-line
      link: 'http://www.dt.co.kr/contents.html?article_no=2018080202101731041001&ref=naver'
    },
    {
      src: 'logo-financial-news.png',
      // tslint:disable-next-line
      link: 'http://www.fnnews.com/news/201807300946070817'
    },
    {
      src: 'logo-forbes.png',
      // tslint:disable-next-line
      link: 'http://www.forbeschina.com/review/201810/0067232.shtml'
    }
  ];

  constructor(private elementRef: ElementRef) {
    super();
  }
}
