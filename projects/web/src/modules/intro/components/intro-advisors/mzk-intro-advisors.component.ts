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
    },
    {
      name: 'Panony',
      imagePath: 'panony-logo.png',
      position: 'Global Blockchain News Facilitator',
      sentences: [
        'Influential global blockchain news based out of China and the United States.',
        'Advisory arm has been providing insights to leaders in blockchain industry, ' +
        'as well as creating synergy across markets and between organizations.\n',
        'The team comprises earliest cryptocurrency adopters and seasoned consultants.'
      ]
    }
  ];

  advisorsKR: Advisors[] = [
    {
      name: '조민식',
      imagePath: 'MichaelCho.jpg',
      position: '카카오 사외이사',
      sentences: [
        '(EX) Senior Partner, Samjong KPMG Accounting Corporation',

        'Certified Public Accountant'
      ]
    },
    {
      name: 'JoonKee Hong',
      imagePath: 'JoonkeeHong.png',
      position: '카카오뱅크 사외이사',
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
      position: '네이버 VC 스프링캠프 대표',
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
    },
    {
      name: 'Panony',
      imagePath: 'panony-logo.png',
      position: 'Global Blockchain News Facilitator',
      sentences: [
        'Influential global blockchain news based out of China and the United States.\n',
        'Advisory arm has been providing insights to leaders in blockchain industry, ' +
        'as well as creating synergy across markets and between organizations.\n',
        'The team comprises earliest cryptocurrency adopters and seasoned consultants.'
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
