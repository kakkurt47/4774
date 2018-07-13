import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '@muzika/core';

@Component({
  selector: 'intro-leadership-team',
  templateUrl: './mzk-intro-leadership.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-leadership.component.scss'
  ]
})
export class MzkIntroLeadershipComponent extends BaseComponent {
  leaders: any[] = [];

  leaders_EN: any[] = [
    {
      name: 'Inseo Chung',
      imagePath: 'assets/images/leader-inseo.png',
      position: 'CEO',
      sentences: [
        'An aspiring pianist and a 2nd place winner of the National Student Music Competition',

        `An entrepreneur of an E-commerce startup and social media marketing agency after dropping out of high school  at his 17， 
        and founded Mapiacompany Inc. when he was 19.`,

        'Manager & owner of  a private community Facebook account of piano music  with over 480,000 followers.',

        'One of the earliest ETH miners in South Korea & co-owner of Ethereum mining pools'
      ]
    },
    {
      name: 'Sangmin Heo',
      imagePath: 'assets/images/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        'A prodigy programmer and developer who made his first fortune from his web game at the age of 15.',

        'The sole developer and  owner of  the famous Korean college-based social media “The Bamboo Network”.',

        `A winner  of  multiple  awards including  the Korean  Olympiad  in  Informatics(2nd), 
        Korea  Intel  Science  Engineering  Fair(1st), 
        a national  candidate  for  Intel  Science  Fair International  Competition Software Division, 
        continuously involved in open source projects of Google on Github since 2015.`
      ]
    },
    {
      name: 'Jangwon Lee',
      imagePath: 'assets/images/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `Fluent with Chinese, English and Korean languages, 
        and founded Piano Group The Serendipity, a professional piano group well-known in South Korea for piano duets;  
        co-founded YouthGlobe Korea, the Korean division of the international 
        NGO YouthGlobe aiming at enhancing educational conditions in Burundi;
        co-founded Shadal Inc., the largest college-based food delivery 
        mobile application in South Korea  – all during his college years.`,

        `maintains substantial  key network across the most brilliant  young  minds  of  blockchain, 
        technology and  the finance  industry in the country.`
      ]
    }
  ];

  leaders_KR: any[] = [
    {
      name: '정인서',
      imagePath: 'assets/images/leader-inseo.png',
      position: 'CEO',
      sentences: [
        '열정적인 피아니스트, 전국학생음악경연대회 2위',

        `17세에 고등학교 중퇴 후 E-커머스와 소셜미디어 마케팅 스타트업 창업, 19세에 마피아컴퍼니 창업`,

        '48만명 이상의 팔로워를 보유한 피아노 음악 관련 페이스북 페이지 운영',

        '초창기 이더리움 채굴자. 이더리움 마이닝풀 공동소유자'
      ]
    },
    {
      name: '허상민',
      imagePath: 'assets/images/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        '영재 프로그래머로서 15세에 웹게임 제작',

        '한국 대학생 소셜미디어의 ‘대나무숲’의 창업자이자 개발자',

        'NCSoft AI Center NLP Lab 연구원 출신',

        `한국정보올림피아드(2위), Intel Science Engineering Fair(1위), Intel Science Fair 소프트웨어 부문 대한민국 국가대표 등 다수의 수상경력 보유`
      ]
    },
    {
      name: '이장원',
      imagePath: 'assets/images/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `중국어, 영어, 한국어 구사`,
        '피아노그룹 ‘The Serendipity’ 창립자',
        `세계적 NGO YouthGlobe의 한국지부 YouthGlobe Korea의 공동창립자, 대한민국 최대 대학교 기반 배달 어플리케이션 샤달의 공동창업자`,
        '블록체인, 기술, 파이낸스 분야의 주요 전문가들과 인적 네트위크 구축'
      ]
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
        switch (this.translateService.currentLang) {
          case Lang.KOR:
            this.leaders = this.leaders_KR;
            break;

          case Lang.CHN:
            this.leaders = this.leaders_EN;
            break;

          default:
            this.leaders = this.leaders_EN;
        }
      })
    );
  }
}
