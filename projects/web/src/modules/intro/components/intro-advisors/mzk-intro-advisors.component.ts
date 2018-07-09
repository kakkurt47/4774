

import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';

@Component({
  selector: 'intro-advisors',
  templateUrl: './mzk-intro-advisors.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-advisors.component.scss'
  ]
})
export class MzkIntroAdvisorsComponent extends BaseComponent {
  advisors: any[] = [
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
      position: 'Non-executive Director of Kakao',
      sentences: [
        '(EX) Asia Head of Global Finance(Capital Markets), Nomura International',

        '(EX) Asia Head of Global Finance(Capital Markets), Lehman Brothers',
      ]
    },
    {
      name: 'Yoonwoo Lee',
      imagePath: 'YoonwooLee.png',
      position: 'CEO & Vice Chairman of Samsung Electronics',
      sentences: [
        '(EX) Asia Head of Global Finance(Capital Markets), Nomura International',
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
      imagePath: 'JinsooPark.png',
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
      name: 'Tokenomia',
      imagePath: 'Tokenomia.png',
      position: 'Premier cyptocurrency company builder & TGE Advisory',
      sentences: [
        '(EX) Team Leader, Seoul Techno Holdings',
      ]
    },
  ];


  ngOnInit() {
    super.ngOnInit();
  }


}
