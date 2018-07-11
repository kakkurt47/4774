import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';
import { TranslateService } from '@ngx-translate/core';

export interface Advisors {
  name: string;
  imagePath: string;
  position: string;
  sentences: string[];
}

@Component({
  selector: 'intro-advisors',
  templateUrl: './mzk-intro-advisors.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-advisors.component.scss'
  ]
})
export class MzkIntroAdvisorsComponent extends BaseComponent {
  advisors: Advisors[] = [];

  advisorsEN: Advisors[] = [
    {
      name: 'Michael Cho',
      imagePath: 'MichaelCho.jpg',
      position: 'Non-executive Director of Kakao',
      sentences: [
        '(EX) Senior Partner, Samjong KPMG Accounting Corporation',

        'Certified Public Accountant'
      ]
    },
    {
      name: 'JoonKee Hong',
      imagePath: 'JoonkeeHong.png',
      position: 'Non-executive Director of Kakao Bank',
      sentences: [
        '(EX) Asia Head of Global Finance(Capital Markets), Nomura International',

        '(EX) Asia Head of Global Finance(Capital Markets), Lehman Brothers'
      ]
    },
    {
      name: 'Yoonwoo Lee',
      imagePath: 'YoonwooLee.png',
      position: 'CEO & Vice Chairman of Samsung Electronics',
      sentences: [
        '(EX) Asia Head of Global Finance(Capital Markets), Nomura International'
      ]
    },


    {
      name: 'Inkyu Choi',
      imagePath: 'InkyuChoi.png',
      position: 'Naver Venture Capital',
      sentences: [
        '(EX) Team Leader, Seoul Techno Holdings',
        '(EX) Partner Patent Attoney, Maps Intellectual Property Law Firm',
        '(EX) Software Engineer, Empas Search Engine',
        'Certified Patent Attorney'
      ]
    },
    {
      name: 'Jinsoo Park',
      imagePath: 'jinsoopark.jpg',
      position: 'Team Leader of YG Entertainment',
      sentences: [
        '(EX) Director and CFO, YG investment',
        '(EX) Senior Associate, Samill PricewaterhouseCoopers',
        'Certified Public Accountant',
        'Certified Financial Analyst'
      ]
    },
    {
      name: 'Myunsik Cho',
      imagePath: 'MyunsikCho.png',
      position: 'Lawyer, Dongnyuk LLC',
      sentences: [
        'Top legal specialist in music, entertainment, film, and copyright law',
        '(Ex) Legal Advisor of Korean Film Producers’ Association',
        '(Ex) Legal Representative of JYP Entertainment, Star Empire, Jellyfish\n' +
        'Entertainment, Ji Young Baek, amoung other numerous musicians,\n' +
        'actors, and celebrities'
      ]
    }
  ];

  advisorsKR: Advisors[] = [
    {
      name: '조민식',
      imagePath: 'MichaelCho.jpg',
      position: '카카오 사외이사',
      sentences: [
        '(前)시니어파트너, 삼정 KPMG 회계법인',

        '공인회계사(CPA)'
      ]
    },
    {
      name: '홍준기',
      imagePath: 'JoonkeeHong.png',
      position: '카카오뱅크 사외이사',
      sentences: [
        '(前) 노무라증권 Asia Head of Global Finance(Capital Markets)',

        '(前) 리만브라더스 Asia Head of Global Finance(Capital Markets)'
      ]
    },
    {
      name: '이윤우',
      imagePath: 'YoonwooLee.png',
      position: '(前) 삼성전자 CEO, 부회장',
      sentences: []
    },


    {
      name: '최인규',
      imagePath: 'InkyuChoi.png',
      position: '네이버 VC 스프링캠프 대표',
      sentences: [
        '(前) 서울테크노홀딩스 팀장',
        '(前) MAPS 특허법인 파트너 변리사',
        '(前) 엠파스 검색엔진 소프트웨어 엔지니어',
        '변리사'
      ]
    },
    {
      name: '박진수',
      imagePath: 'jinsoopark.jpg',
      position: 'YG 엔터테인먼트 팀리더',
      sentences: [
        '(前) YG 인베스트먼트 이사, CFO',
        '(前) 삼일 PWC 회계법인 시니어 어소시에이트',
        '공인회계사(CPA)',
        '국제재무분석사(CFA)'
      ]
    },
    {
      name: '조면식',
      imagePath: 'MyunsikCho.png',
      position: '동녘 LLC 변호사',
      sentences: [
        '음악, 엔터테인먼트, 영화, 저작권 법률 전문가',
        '(前) 한국영화제작가협회 법률고문',
        '(前) JYP, 스타제국, 젤리피쉬 엔터테인먼트 및 백지영 등 다수 음악가와 배우 법률자문'
      ]
    }
  ];

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.advisors = this.advisorsEN;
    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        switch (this.translateService.currentLang) {
          case 'ko':
            this.advisors = this.advisorsKR;
            break;

          case 'ch':
            this.advisors = this.advisorsKR;
            break;

          default:
            this.advisors = this.advisorsEN;
        }
      })
    );
  }


}
