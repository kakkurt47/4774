import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../../../models/lang';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'intro-leadership-team',
  templateUrl: './mzk-intro-leadership.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-leadership.component.scss'
  ]
})
export class MzkIntroLeadershipComponent extends BaseComponent {
  currentLang: string;

  leaders: any[] = [];

  leaders_EN: any[] = [
    {
      name: 'Inseo Chung',
      imagePath: 'assets/intro-img/leader-inseo.png',
      position: 'CEO',
      sentences: [
        'Serial Entrepreneur and Professional Pianist',
        `2nd Place, National Student Music Competition`,
        'One of the earliest Ethereum miners in Korea',
      ],
      facebook: 'https://www.facebook.com/thankspinaoman/',
      linkedin: 'https://www.linkedin.com/in/inseo-chung-331427171/'
    },
    {
      name: 'Sangmin Heo',
      imagePath: 'assets/intro-img/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        'Computer Science, Hanyang University',
        'Global Finalist, Intel Science and Engineering Fair(ISEF)',
        `Sole Developer of 'The Bamboo Network'`,
      ],
      github: 'https://github.com/leo6104',
      linkedin: 'https://www.linkedin.com/in/%EC%83%81%EB%AF%BC-%ED%97%88-4a3507169/'
    },
    {
      name: 'Jangwon Lee',
      imagePath: 'assets/intro-img/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `Business Adminstration, Seoul National University`,
        'Co-founder of Shadal Inc and Youthglobe Korea',
        `Trilingual entrepreneur with key global networks`,
      ],
      linkedin: 'https://www.linkedin.com/in/jang-won-lee-5811b211a/'
    }
  ];

  leaders_ZH: any[] = [
    {
      name: 'Inseo Chung',
      imagePath: 'assets/intro-img/leader-inseo.png',
      position: 'CEO',
      sentences: [
        'Serial Entrepreneur and Professional Pianist',
        `2nd Place, National Student Music Competition`,
        'One of the earliest Ethereum miners in Korea',
      ],
      facebook: 'https://www.facebook.com/thankspinaoman/',
      linkedin: 'https://www.linkedin.com/in/inseo-chung-331427171/'
    },
    {
      name: 'Sangmin Heo',
      imagePath: 'assets/intro-img/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        'Computer Science, Hanyang University',
        'Global Finalist, Intel Science and Engineering Fair(ISEF)',
        `Sole Developer of 'The Bamboo Network'`,
      ],
      github: 'https://github.com/leo6104',
      linkedin: 'https://www.linkedin.com/in/%EC%83%81%EB%AF%BC-%ED%97%88-4a3507169/'
    },
    {
      name: 'Jangwon Lee',
      imagePath: 'assets/intro-img/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `Business Adminstration, Seoul National University`,
        'Co-founder of Shadal Inc and Youthglobe Korea',
        `Trilingual entrepreneur with key global networks`,
      ],
      linkedin: 'https://www.linkedin.com/in/jang-won-lee-5811b211a/'
    }
  ];

  leaders_KR: any[] = [
    {
      name: '정인서',
      imagePath: 'assets/intro-img/leader-inseo.png',
      position: 'CEO',
      sentences: [
        'Serial Entrepreneur and Professional Pianist',
        `2nd Place, National Student Music Competition`,
        'One of the earliest Ethereum miners in Korea',
      ],
      facebook: 'https://www.facebook.com/thankspinaoman/',
      linkedin: 'https://www.linkedin.com/in/inseo-chung-331427171/'
    },
    {
      name: '허상민',
      imagePath: 'assets/intro-img/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        'Computer Science, Hanyang University',
        'Global Finalist, Intel Science and Engineering Fair(ISEF)',
        `Sole Developer of 'The Bamboo Network'`,
      ],
      github: 'https://github.com/leo6104',
      linkedin: 'https://www.linkedin.com/in/%EC%83%81%EB%AF%BC-%ED%97%88-4a3507169/'
    },
    {
      name: '이장원',
      imagePath: 'assets/intro-img/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `Business Adminstration, Seoul National University`,
        'Co-founder of Shadal Inc and Youthglobe Korea',
        `Trilingual entrepreneur with key global networks`,
      ],
      linkedin: 'https://www.linkedin.com/in/jang-won-lee-5811b211a/'
    }
  ];

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.leaders = this.leaders_EN;
    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.currentLang = this.translateService.currentLang;

        switch (this.translateService.currentLang) {
          case Lang.KOR:
            this.leaders = this.leaders_KR;
            break;

          case Lang.CHN:
            this.leaders = this.leaders_ZH;
            break;

          default:
            this.leaders = this.leaders_EN;
        }
      })
    );
  }
}
