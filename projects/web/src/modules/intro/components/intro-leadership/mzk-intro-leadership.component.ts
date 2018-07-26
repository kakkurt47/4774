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
  currentLang: string;

  leaders: any[] = [];

  leaders_EN: any[] = [
    {
      name: 'Inseo Chung',
      imagePath: 'assets/intro-img/leader-inseo.png',
      position: 'CEO',
      sentences: [
        'An aspiring pianist and a 2nd place winner of the National Student Music Competition',

        `An entrepreneur of an E-commerce startup and social media marketing agency after dropping out of high school  at his 17， 
        and founded Mapiacompany Inc. when he was 19.`,

        'Manager & owner of  a private community Facebook account of piano music  with over 480,000 followers.',

        'One of the earliest ETH miners in South Korea & co-owner of Ethereum mining pools'
      ],
      facebook: 'https://www.facebook.com/thankspinaoman/'
    },
    {
      name: 'Sangmin Heo',
      imagePath: 'assets/intro-img/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        'Computer Science, Hanyang Univesity',

        'A prodigy programmer and developer who made his first fortune from his web game at the age of 15.',

        'The sole developer and  owner of  the famous Korean college-based social media “The Bamboo Network”.',

        `A winner  of  multiple  awards including  the Korean  Olympiad  in  Informatics(2nd), 
        Korea  Intel  Science  Engineering  Fair(1st), 
        a national  candidate  for  Intel  Science  Fair International  Competition Software Division, 
        continuously involved in open source projects of Google on Github since 2015.`
      ],
      github: 'https://github.com/leo6104'
    },
    {
      name: 'Jangwon Lee',
      imagePath: 'assets/intro-img/leader-jangwon.png',
      position: 'COO',
      sentences: [
        'Business Administration, Seoul National University + Top Graduate of Daewon Foreign Language Highschool',

        `Fluent with Chinese, English and Korean languages, 
        and founded Piano Group The Serendipity, a professional piano group well-known in South Korea for piano duets;  
        co-founded YouthGlobe Korea, the Korean division of the international 
        NGO YouthGlobe aiming at enhancing educational conditions in Burundi;
        co-founded Shadal Inc., the largest college-based food delivery 
        mobile application in South Korea  – all during his college years.`,

        `maintains substantial  key network across the most brilliant  young  minds  of  blockchain, 
        technology and  the finance  industry in the country.`
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
        '钢琴演奏家，曾荣获韩国全国青年钢琴演奏竞赛亚军头衔\n',

        `17岁时创办了一家电子商务公司和一家著名的社交媒体营销机构。19岁时成立了Mapiacompany Inc. 。`,

        '私人管理和自主拥有一个与钢琴音乐相关超过48万粉丝的“脸书（Facebook）”帐号。',

        '韩国数字货币和区块链领域的早期的以太坊“矿工”，联名拥有以太坊矿池。'
      ],
      facebook: 'https://www.facebook.com/thankspinaoman/'
    },
    {
      name: 'Sangmin Heo',
      imagePath: 'assets/intro-img/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        '神童程序员和软件程序开发工程师，15岁时已通过开发网络游戏赚取了自己人生的第一笔财富。\n',

        '韩国著名的高校社交媒体 “The Bamboo Network” 的创建者和所有者。\n',

        '韩国电子信息奥林匹克获奖者、KISEF美国心理学会长奖获奖者、ISEF国际大会软件部门韩国代表、HCLT优秀学术论文第一作者、深度学习和自然语处理、区块链领域的年轻专家。',

        '自2015年以来，一直参与到谷歌 Google 在Github平台上的开源代码项目。'
      ],
      github: 'https://github.com/leo6104'
    },
    {
      name: 'Jangwon Lee',
      imagePath: 'assets/intro-img/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `能说一口流利的英语，中文，韩语，并且是一名专业的钢琴师以及一位有经验的商业发展领导者。创办了钢琴集团之情缘（Piano Group The Serendipity）, 
        在韩国以钢琴二重奏闻名。联合创建了YouthGlobe Korea， 一个旨在加强布隆迪教育状况的国际非政府组织YouthGlobe的韩国分部。同时，联合创建了Shadal Inc.-韩国最大的高校食品配送移动应用程序。`,

        `在韩国区块链、技术和金融行业领域中拥有广泛和可靠的关键网络与人脉资源关系。`
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
        '열정적인 피아니스트, 전국학생음악경연대회 2위',

        `17세에 고등학교 중퇴 후 E-커머스와 소셜미디어 마케팅 스타트업 창업, 19세에 마피아컴퍼니 창업`,

        '48만명 이상의 팔로워를 보유한 피아노 음악 관련 페이스북 페이지 운영',

        '초창기 이더리움 채굴자. 이더리움 마이닝풀 공동소유자'
      ],
      facebook: 'https://www.facebook.com/thankspinaoman/'
    },
    {
      name: '허상민',
      imagePath: 'assets/intro-img/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        '영재 프로그래머로서 15세에 웹게임 제작',

        '한국 대학생 소셜미디어의 ‘대나무숲’의 창업자이자 개발자',

        'NCSoft AI Center NLP Lab 연구원 출신',

        `한국정보올림피아드(2위), Intel Science Engineering Fair(1위), Intel Science Fair 소프트웨어 부문 대한민국 국가대표 등 다수의 수상경력 보유`
      ],
      github: 'https://github.com/leo6104'
    },
    {
      name: '이장원',
      imagePath: 'assets/intro-img/leader-jangwon.png',
      position: 'COO',
      sentences: [
        `중국어, 영어, 한국어 구사`,
        '피아노그룹 ‘The Serendipity’ 창립자',
        `세계적 NGO YouthGlobe의 한국지부 YouthGlobe Korea의 공동창립자, 대한민국 최대 대학교 기반 배달 어플리케이션 샤달의 공동창업자`,
        '블록체인, 기술, 파이낸스 분야의 주요 전문가들과 인적 네트위크 구축'
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
