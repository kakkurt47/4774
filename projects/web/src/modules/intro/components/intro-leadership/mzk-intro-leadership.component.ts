import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.leaders = this.leaders_EN;
    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        switch (this.translateService.currentLang) {
          case 'ko':
            this.leaders = this.leaders_KR;
            break;

          case 'ch':
            this.leaders = this.leaders_EN;
            break;

          default:
            this.leaders = this.leaders_EN;
        }
      })
    );
  }
}
