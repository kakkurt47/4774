import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '@muzika/core';

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
      name: 'Yoonwoo Lee',
      imagePath: 'YoonwooLee.png',
      position: '(EX) CEO & Vice Chairman of Samsung Electronics',
      sentences: [
      ]
    },
    {
      name: 'Stella Kung',
      imagePath: 'qtum_stella.jpg',
      position: 'CMO of QTUM',
      sentences: [
        'One of the earliest marketing and public relations practitioners in blockchain industry. ',
        'Served in different sides of the table from DACx, ZAFED and ChainB. ',
        'Advisor of leading, next-generation media and consultancy firm PANONY, and an Asia-based project Mithril.'
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
      imagePath: 'parkjinsoo.jpg',
      position: 'CFO, Huaybrothers Entertainment',
      sentences: [
        '(EX) Director and CFO, YG investment',
        '(EX) Senior Associate, Samill PricewaterhouseCoopers',
        'Certified Public Accountant',
        'Certified Financial Analyst'
      ]
    },
    {
      name: 'Brian Lee',
      imagePath: 'blackhorse-brian.jpg',
      position: 'Managing Director, BlackHorse Group',
      sentences: [
        'Former investment banker at China Development Bank and CJSC. ',
        'President at Digital Asset Investment Association ("DAIA"). ',
        'Invested over 20 blockchain-based projects, including Quarkchain, Fantom, Open Platform and many others.',
        'Graduated with Investment and Financial Risk Management from Cass Business School.'
      ]
    },
    // {
    //   name: 'Adrian Lai',
    //   imagePath: 'adrian_lai.png',
    //   position: 'Managing Director, BlackHorse Group',
    //   sentences: [
    //     '(Ex) BlackRock with diversified experience in sales, marketing, fintech and corporate governance. ',
    //     'Trainer of HKSI and Kaplan Financials on cryptocurrency and blockchain technology. ',
    //     'Speaker and guest lecturer at industry events and universities. ',
    //     'Former ICO investment lead at Orichal Partners'
    //   ]
    // },
    {
      name: 'Alyssa Tsai ',
      imagePath: 'panony_alyssa.jpg',
      position: 'Founder & CEO of PANONY',
      sentences: [
        'Early adopter in blockchain industry. Assisted leading blockchain projects for market-entry and go-global strategies. ',
        'Former Project Lead at Conde Nast International, Consultant at Isentia ' +
        '(ASX: ISD) and seasoned communication specialist from Ogilvy.'
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

  advisorsZH: Advisors[] = [
    {
      name: 'Michael Cho',
      imagePath: 'MichaelCho.jpg',
      position: 'KAKAO 社外董事',
      sentences: [
        '前 三星KMPG企业 资深合伙人',

        '注册会计师 （CPA)'
      ]
    },
    {
      name: 'Yoonwoo Lee',
      imagePath: 'YoonwooLee.png',
      position: ' 三星电子CEO & 副会长',
      sentences: [
      ]
    },
    {
      name: 'Stella Kung',
      imagePath: 'qtum_stella.jpg',
      position: 'QTUM量子首席营销官',
      sentences: [
        '区块链早期市场营销与公众关系管理业内人士',
        '拥有丰富的从业经验，协助区块链项目包括 DACx, ZAFED and ChainB. ',
        '身兼区块链行业专业咨询PANONY公司与 Mithril秘银区块链项目的高级顾问。'
      ]
    },


    {
      name: 'JoonKee Hong',
      imagePath: 'JoonkeeHong.png',
      position: 'KAKAO BANK 社外董事',
      sentences: [
        '前 野村国际亚洲金融（资本市场）主管',

        '前 雷曼兄弟国际亚洲金融（资本市场）主管'
      ]
    },

    {
      name: 'Inkyu Choi',
      imagePath: 'InkyuChoi.png',
      position: 'Naver 风投资本',
      sentences: [
        '前汉城科技控股有限公司 项目主管',
        '前MAPS知识产权法律公司 合伙人专利代理人',
        '前Empas收索搜索引擎 软件工程师\n',
        '注册专利律师'
      ]
    },
    {
      name: 'Jinsoo Park',
      imagePath: 'parkjinsoo.jpg',
      position: '韩国 YG Entertainment 娱乐经纪公司 项目主管 ',
      sentences: [
        '前 韩国 YG Investment 投资公司 部门主任 & CFO',
        ' 前 Samil PricewaterhouseCoopers 资深合伙人',
        '注册会计师 （CPA）',
        '注册金融分析师'
      ]
    },
    {
      name: 'Brian Lee',
      imagePath: 'blackhorse_brian.jpg',
      position: 'BlackHorse Group 董事总经理',
      sentences: [
        '前China Development Bank 与 CJSC 投资银行家',
        '数字资产投资协会Digital Asset Investment Association (“DAIA”) 主席',
        '投资包括 Quarkchain, Fantom, Open Platform 等在内的20多个区块链项目。',
        '毕业于卡斯商学院的投资与金融风险管理'
      ]
    },
    // {
    //   name: 'Adrian Lai',
    //   imagePath: 'adrian_lai.png',
    //   position: 'BlackHorse Group 董事总经理',
    //   sentences: [
    //     '前 贝莱德集团销售、市场营销、金融科技与公司治理领域的专业人士\n',
    //     'HKSI 与 Kaplan Financials 数字货币与区块链技术的培训师\n',
    //     '业界动态与高校场合的做客演说者\n',
    //     '前 Orichal Partners ICO投资项目的主管 '
    //   ]
    // },
    {
      name: 'Alyssa Tsai ',
      imagePath: 'panony_alyssa.jpg',
      position: 'PANONY创始人兼CEO',
      sentences: [
        '区块链行业早期业内人士，协助优质区块链项目的市场进入策略与全球化营销策略。 ',
        '前 Conde Nast International 项目主管， 前 Isentia (ASX: ISD) 专业顾问， 前 Ogilvy 资深沟通专业人士。'
      ]
    },
    {
      name: 'Myunsik Cho',
      imagePath: 'MyunsikCho.png',
      position: '韩国 Dongnyuk LLC 律师事务所 代表律师',
      sentences: [
        '音乐，娱乐，影视与版权法方面的顶尖法律专家\n',
        '前 韩国电影制片人协会 法律顾问\n',
        '前 韩国JYP娱乐有限公司，韩国Star Empire Entertainment 唱片公司，韩国Jellyfish Entertainment 艺人经纪公司，包括白智英在内的多位韩国音乐艺术家，演员和明星的法律代表律师'
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
      name: '이윤우',
      imagePath: 'YoonwooLee.png',
      position: '(前) 삼성전자 CEO, 부회장',
      sentences: []
    },
    {
      name: 'Stella Kung',
      imagePath: 'qtum_stella.jpg',
      position: '퀀텀(QTUM), CMO',
      sentences: [
        '블록체인 산업 마케팅과 PR의 선구자. ',
        'DACx, ZAFED, ChainB 등 다양한 산업군에서의 경험 보유. ',
        '미디어 컨설팅회사 PANONY, 블록체인 프로젝트 Mithril 자문.'
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
      imagePath: 'parkjinsoo.jpg',
      position: '화이브라더스 엔터테인먼트 CFO',
      sentences: [
        '(前) YG 인베스트먼트 이사, CFO',
        '(前) 삼일 PWC 회계법인 시니어 어소시에이트',
        '공인회계사(CPA)',
        '국제재무분석사(CFA)'
      ]
    },
    {
      name: 'Brian Lee',
      imagePath: 'blackhorse-brian.jpg',
      position: 'BlackHorse 그룹 이사',
      sentences: [
        '(前) 중국 국가개발은행, CJSC 투자은행 근무 ',
        'Digital Asset Investment Association ("DAIA") 회장. ',
        'Quarkchain, Fantom, Open Platform 등 20개 이상의 블록체인 프로젝트에 투자.',
        'Cass Business School에서 Investment와 Financial Risk Management 전공.'
      ]
    },
    // {
    //   name: 'Adrian Lai',
    //   imagePath: 'adrian_lai.png',
    //   position: 'Managing Director, BlackHorse Group',
    //   sentences: [
    //     '(Ex) BlackRock with diversified experience in sales, marketing, fintech and corporate governance. ',
    //     'Trainer of HKSI and Kaplan Financials on cryptocurrency and blockchain technology. ',
    //     'Speaker and guest lecturer at industry events and universities. ',
    //     'Former ICO investment lead at Orichal Partners'
    //   ]
    // },
    {
      name: 'Alyssa Tsai ',
      imagePath: 'panony_alyssa.jpg',
      position: 'PANONY의 창립자, 대표이사',
      sentences: [
        '블록체인 산업 초기부터 주요 프로젝트의 시장 진입과 글로벌 마케팅 전략 지원. ',
        '(前) Conde Nast international 프로젝트 리더, Istentia 컨설턴트  ' +
        '(ASX: ISD), Ogilvy 커뮤니케이션 스페셜리스트' +
        '.'
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
          case Lang.KOR:
            this.advisors = this.advisorsKR;
            break;

          case Lang.CHN:
            this.advisors = this.advisorsZH;
            break;

          default:
            this.advisors = this.advisorsEN;
        }
      })
    );
  }


}
