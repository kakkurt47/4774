import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../../../models/lang';
import { BaseComponent } from '../../../../models/base.component';

export interface Advisors {
  name?: string;
  position?: string;
  sentences?: string[];
  imagePath: string;
  i18nName?: {
    [key: string]: string;
  };
  i18nPosition?: {
    [key: string]: string;
  };
  i18nSentences?: {
    [key: string]: string[]
  };
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
  currentLang: string;

  advisors: Advisors[] = [
    {
      'imagePath': 'MichaelCho.png',
      'i18nPosition': {
        [Lang.ENG]: 'Non-executive Director of Kakao',
        [Lang.KOR]: '카카오 사외이사',
        [Lang.CHN]: 'KAKAO 社外董事'
      },
      'i18nName': {
        [Lang.KOR]: '조민식',
        [Lang.ENG]: 'Michael Cho',
        [Lang.CHN]: 'Michael Cho'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          '(EX) Senior Partner, Samjong KPMG Accounting Corporation',
          'Certified Public Accountant'
        ],
        [Lang.KOR]: [
          '(前)시니어파트너, 삼정 KPMG 회계법인',
          '공인회계사(CPA)'
        ],
        [Lang.CHN]: [
          '前 三星KMPG企业 资深合伙人',
          '注册会计师 （CPA)'
        ]
      }
    },
    {
      'imagePath': 'YoonwooLee.png',
      'i18nPosition': {
        [Lang.ENG]: '(EX) CEO & Vice Chairman of Samsung Electronics',
        [Lang.KOR]: '(前) 삼성전자 CEO, 부회장',
        [Lang.CHN]: '(前) 三星电子CEO & 副会长'
      },
      'i18nName': {
        [Lang.ENG]: 'Yoonwoo Lee',
        [Lang.KOR]: '이윤우',
        [Lang.CHN]: 'Yoonwoo Lee'
      },
      'i18nSentences': {
        [Lang.ENG]: [

        ],
        [Lang.KOR]: [

        ],
        [Lang.CHN]: [

        ]
      }
    },
    {
      'imagePath': 'qtum_stella.png',
      'i18nPosition': {
        [Lang.ENG]: 'CMO of QTUM',
        [Lang.KOR]: '퀀텀(QTUM), CMO',
        [Lang.CHN]: 'QTUM量子首席营销官'
      },
      'i18nName': {
        [Lang.ENG]: 'Stella Kung',
        [Lang.KOR]: 'Stella Kung',
        [Lang.CHN]: 'Stella Kung'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          'One of the earliest marketing and public relations practitioners in blockchain industry. ',
          'Served in different sides of the table from DACx, ZAFED and ChainB. ',
          'Advisor of leading, next-generation media and consultancy firm PANONY, and an Asia-based project Mithril.'
        ],
        [Lang.KOR]: [
          '블록체인 산업 마케팅과 PR의 선구자. ',
          'DACx, ZAFED, ChainB 등 다양한 산업군에서의 경험 보유. ',
          '미디어 컨설팅회사 PANONY, 블록체인 프로젝트 Mithril 자문.'
        ],
        [Lang.CHN]: [
          '区块链早期市场营销与公众关系管理业内人士',
          '拥有丰富的从业经验，协助区块链项目包括 DACx, ZAFED and ChainB. ',
          '身兼区块链行业专业咨询PANONY公司与 Mithril秘银区块链项目的高级顾问。'
        ]
      }
    },
    {
      'imagePath': 'JoonkeeHong.png',
      'i18nPosition': {
        [Lang.ENG]: 'Non-executive Director of Kakao Bank',
        [Lang.KOR]: '카카오뱅크 사외이사',
        [Lang.CHN]: 'KAKAO BANK 社外董事'
      },
      'i18nName': {
        [Lang.ENG]: 'JoonKee Hong',
        [Lang.KOR]: '홍준기',
        [Lang.CHN]: 'JoonKee Hong'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          '(EX) Asia Head of Global Finance(Capital Markets), Nomura International',
          '(EX) Asia Head of Global Finance(Capital Markets), Lehman Brothers'
        ],
        [Lang.KOR]: [
          '(前) 노무라증권 Asia Head of Global Finance(Capital Markets)',
          '(前) 리만브라더스 Asia Head of Global Finance(Capital Markets)'
        ],
        [Lang.CHN]: [
          '前 野村国际亚洲金融（资本市场）主管',
          '前 雷曼兄弟国际亚洲金融（资本市场）主管'
        ]
      }
    },
    {
      'imagePath': 'InkyuChoi.png',
      'i18nPosition': {
        [Lang.ENG]: 'Naver Venture Capital',
        [Lang.KOR]: '네이버 VC 스프링캠프 대표',
        [Lang.CHN]: 'Naver 风投资本'
      },
      'i18nName': {
        [Lang.ENG]: 'Inkyu Choi',
        [Lang.KOR]: '최인규',
        [Lang.CHN]: 'Inkyu Choi'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          '(EX) Team Leader, Seoul Techno Holdings',
          '(EX) Partner Patent Attoney, Maps Intellectual Property Law Firm',
          '(EX) Software Engineer, Empas Search Engine',
          'Certified Patent Attorney'
        ],
        [Lang.KOR]: [
          '(前) 서울테크노홀딩스 팀장',
          '(前) MAPS 특허법인 파트너 변리사',
          '(前) 엠파스 검색엔진 소프트웨어 엔지니어',
          '변리사'
        ],
        [Lang.CHN]: [
          '前汉城科技控股有限公司 项目主管',
          '前MAPS知识产权法律公司 合伙人专利代理人',
          '前Empas收索搜索引擎 软件工程师\n',
          '注册专利律师'
        ]
      }
    },
    {
      'name': '박진수',
      'imagePath': 'parkjinsoo.png',
      'position': '화이브라더스 엔터테인먼트 CFO',
      'sentences': [
        '(前) YG 인베스트먼트 이사, CFO',
        '(前) 삼일 PWC 회계법인 시니어 어소시에이트',
        '공인회계사(CPA)',
        '국제재무분석사(CFA)'
      ],
      'i18nPosition': {
        [Lang.ENG]: 'CFO, Huayibrothers Entertainment',
        [Lang.KOR]: '화이브라더스 엔터테인먼트 CFO',
        [Lang.CHN]: '韩国 YG Entertainment 娱乐经纪公司 项目主管 '
      },
      'i18nName': {
        [Lang.ENG]: 'Jinsoo Park',
        [Lang.KOR]: '박진수',
        [Lang.CHN]: 'Jinsoo Park'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          '(EX) Director and CFO, YG investment',
          '(EX) Senior Associate, Samill PricewaterhouseCoopers',
          'Certified Public Accountant',
          'Certified Financial Analyst'
        ],
        [Lang.KOR]: [
          '(前) YG 인베스트먼트 이사, CFO',
          '(前) 삼일 PWC 회계법인 시니어 어소시에이트',
          '공인회계사(CPA)',
          '국제재무분석사(CFA)'
        ],
        [Lang.CHN]: [
          '前 韩国 YG Investment 投资公司 部门主任 & CFO',
          ' 前 Samil PricewaterhouseCoopers 资深合伙人',
          '注册会计师 （CPA）',
          '注册金融分析师'
        ]
      }
    },
    {
      'imagePath': 'blackhorse-brian.png',
      'i18nPosition': {
        [Lang.ENG]: 'Managing Director, BlackHorse Group',
        [Lang.KOR]: 'BlackHorse 그룹 이사',
        [Lang.CHN]: 'BlackHorse Group 董事总经理'
      },
      'i18nName': {
        [Lang.ENG]: 'Brian Lee',
        [Lang.KOR]: 'Brian Lee',
        [Lang.CHN]: 'Brian Lee'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          'Former investment banker at China Development Bank and CJSC. ',
          'President at Digital Asset Investment Association ("DAIA"). ',
          'Invested over 20 blockchain-based projects, including Quarkchain, Fantom, Open Platform and many others.',
          'Graduated with Investment and Financial Risk Management from Cass Business School.'
        ],
        [Lang.KOR]: [
          '(前) 중국 국가개발은행, CJSC 투자은행 근무 ',
          'Digital Asset Investment Association ("DAIA") 회장. ',
          'Quarkchain, Fantom, Open Platform 등 20개 이상의 블록체인 프로젝트에 투자.',
          'Cass Business School에서 Investment와 Financial Risk Management 전공.'
        ],
        [Lang.CHN]: [
          '前China Development Bank 与 CJSC 投资银行家',
          '数字资产投资协会Digital Asset Investment Association (“DAIA”) 主席',
          '投资包括 Quarkchain, Fantom, Open Platform 等在内的20多个区块链项目。',
          '毕业于卡斯商学院的投资与金融风险管理'
        ]
      }
    },
    {
      'imagePath': 'adrian_lai.png',
      'i18nPosition': {
        [Lang.ENG]: 'Managing Director, BlackHorse Group',
        [Lang.KOR]: 'BlackHorse 그룹 이사',
        [Lang.CHN]: 'BlackHorse Group 董事总经理'
      },
      'i18nName': {
        [Lang.ENG]: 'Adrian Lai',
        [Lang.KOR]: 'Adrian Lai',
        [Lang.CHN]: 'Adrian Lai'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          '(Ex) BlackRock with diversified experience in sales, marketing, fintech and corporate governance. ',
          'Trainer of HKSI and Kaplan Financials on cryptocurrency and blockchain technology. ',
          'Speaker and guest lecturer at industry events and universities. ',
          'Former ICO investment lead at Orichal Partners'
        ],
        [Lang.KOR]: [
          '(前) BlackRock 근무',
          'HKSI와 Kaplan Financials 암호화폐와 블록체인 기술 트레이너',
          '다수 기업체와 대학교에서 강연 경력 보유 ',
          '(前) Orichal Partners ICO 투자 리더'
        ],
        [Lang.CHN]: [
          '前 贝莱德集团销售、市场营销、金融科技与公司治理领域的专业人士\n',
          'HKSI 与 Kaplan Financials 数字货币与区块链技术的培训师\n',
          '业界动态与高校场合的做客演说者\n',
          '前 Orichal Partners ICO投资项目的主管 '
        ]
      }
    },
    {
      'imagePath': 'Jonathan-Lee.png',
      i18nName: {
        [Lang.ENG]: 'Jonathan Lee',
        [Lang.KOR]: 'Jonathan Lee',
        [Lang.CHN]: 'Jonathan Lee',
      },
      i18nPosition: {
        [Lang.ENG]: 'Chief Corporate Officer of Yello Digital Marketing Group',
        [Lang.KOR]: '(주)옐로디지털마케팅, CCO',
        [Lang.CHN]: 'Yello Digital Marketing Group公司 首席运营官'
      },
      i18nSentences: {
        [Lang.ENG]: [
          'Chief Corporate Officer of Yello Digital Marketing Group (TOP NO.1 digital marketing & ad technology group in South Korea) ',
          '(EX) Business Development Director for WPP Korea',
          '(EX) Key figure for the International Business Division and ' +
          'Corporate Strategy Division at CJ Music/Mnet Media (currently CJ E&M).'
        ],
        [Lang.KOR]: [
          'COO, 옐로디지털마케팅그룹 (대한민국 1위 디지털 마케팅과 광고기술 회사)',
          '(前) WPP 코리아 사업개발이사 ',
          '(前) CJ E&M 해외사업부문, 전략부문 담당'
        ],
        [Lang.CHN]: [
          'Yello Digital Marketing Group公司的首席运营官 （韩国最大的数字营销与广告技术集团）',
          '前 WPP Korea 商务拓展总监',
          '前 韩国娱乐传媒集团CJ E&M国际商务部和企业战略部 部门主要负责之一'
        ]
      }
    },
    {
      'imagePath': 'panony_alyssa.png',
      'i18nPosition': {
        [Lang.ENG]: 'Founder & CEO of PANONY',
        [Lang.KOR]: 'PANONY의 창립자, 대표이사',
        [Lang.CHN]: 'PANONY创始人兼CEO'
      },
      'i18nName': {
        [Lang.ENG]: 'Alyssa Tsai ',
        [Lang.KOR]: 'Alyssa Tsai ',
        [Lang.CHN]: 'Alyssa Tsai '
      },
      'i18nSentences': {
        [Lang.ENG]: [
          'Early adopter in blockchain industry. Assisted leading blockchain projects for market-entry and go-global strategies. ',
          'Former Project Lead at Conde Nast International, ' +
          'Consultant at Isentia (ASX: ISD) and seasoned communication specialist from Ogilvy.'
        ],
        [Lang.KOR]: [
          '블록체인 산업 초기부터 주요 프로젝트의 시장 진입과 글로벌 마케팅 전략 지원. ',
          '(前) Conde Nast international 프로젝트 리더, Istentia 컨설턴트  (ASX: ISD), Ogilvy 커뮤니케이션 스페셜리스트.'
        ],
        [Lang.CHN]: [
          '区块链行业早期业内人士，协助优质区块链项目的市场进入策略与全球化营销策略。 ',
          '前 Conde Nast International 项目主管， 前 Isentia (ASX: ISD) 专业顾问， 前 Ogilvy 资深沟通专业人士。'
        ]
      }
    },
    {
      'imagePath': 'MyunsikCho.png',
      'i18nPosition': {
        [Lang.ENG]: 'Lawyer, Dongnyuk LLC',
        [Lang.KOR]: '동녘 LLC 변호사',
        [Lang.CHN]: '韩国 Dongnyuk LLC 律师事务所 代表律师'
      },
      'i18nName': {
        [Lang.ENG]: 'Myunsik Cho',
        [Lang.KOR]: '조면식',
        [Lang.CHN]: 'Myunsik Cho'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          'Top legal specialist in music, entertainment, film, and copyright law',
          '(Ex) Legal Advisor of Korean Film Producers’ Association',
          '(Ex) Legal Representative of JYP Entertainment, Star Empire, Jellyfish\n' +
          'Entertainment, Ji Young Baek, amoung other numerous musicians,\nactors, and celebrities'
        ],
        [Lang.KOR]: [
          '음악, 엔터테인먼트, 영화, 저작권 법률 전문가',
          '(前) 한국영화제작가협회 법률고문',
          '(前) JYP, 스타제국, 젤리피쉬 엔터테인먼트 및 백지영 등 다수 음악가와 배우 법률자문'
        ],
        [Lang.CHN]: [
          '音乐，娱乐，影视与版权法方面的顶尖法律专家\n',
          '前 韩国电影制片人协会 法律顾问\n',
          '前 韩国JYP娱乐有限公司，韩国Star Empire Entertainment 唱片公司，韩国Jellyfish Entertainment 艺人经纪公司，包括白智英在内的多位韩国音乐艺术家，演员和明星的法律代表律师'
        ]
      }
    },
    {
      'imagePath': 'kevin_yeung.png',
      'i18nPosition': {
        [Lang.ENG]: 'Partner, Bitshine Group',
        [Lang.KOR]: 'Bitshine Group 파트너',
        [Lang.CHN]: 'Bitshine 合伙人'
      },
      'i18nName': {
        [Lang.ENG]: 'Kevin Yeung',
        [Lang.KOR]: 'Kevin Yeung',
        [Lang.CHN]: 'Kevin Yeung'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          'Diversified background in investment banking, venture capital investment and entrepreneurial venture.',
          'Started in Morgan Stanley investment banking, also structured IPOs led investments ' +
          'across the Asia TMT field with landmark projects such as Momo, Tokopedia, Webank etc.'
        ],
        [Lang.KOR]: [
          'Investment Banking, 벤처캐피탈, 창업 등 다양한 경험과 배경 보유',
          '(前) 모건스탠리 투자은행',
          'Morno, Tokopedia, Webank 등 대표적인 아시아 지역 TMT 회사들의 IPO와 투자자문 경력 보유'
        ],
        [Lang.CHN]: [
          '跨界投资领域资深背景（投资银行、风险投资与创业风险）',
          '摩根斯坦利投资银行出身，曾参与亚洲多个IPO导向的高科技、媒体和电信领域的投资项目，' +
          '其中包括陌陌、印尼版淘宝Tokopedia，微众银行。'
        ]
      }
    },
    {
      'imagePath': 'JangYoon-Kang.png',
      'i18nPosition': {
        [Lang.ENG]: 'Associate at CDIB Capital',
        [Lang.KOR]: 'Associate at CDIB Capital',
        [Lang.CHN]: '中华开发资本合伙人'
      },
      'i18nName': {
        [Lang.ENG]: 'JangYoon Kang',
        [Lang.KOR]: '강장윤',
        [Lang.CHN]: 'JangYoon Kang'
      },
      'i18nSentences': {
        [Lang.ENG]: [
          'M&A professional with 5+ years of experience in the field',
          'Associate at CDIB Capital, a private equity arm of China Development Financial Holding Corporation',
          'Senior Analyst in the cross-border M&A team of KPMG Korea',
          'Consultant in the M&A valuation team at Deloitte Korea'
        ],
        [Lang.KOR]: [
          '5년 이상의 경험을 가진 M&A 전문가',
          'Assicoaite, 사모펀드 CDIB Capital',
          '시니어 애널리스트, Cross-border M&A팀, KPMG 코리아',
          '컨설턴트, M&A 밸류에이션팀, 딜로이트 코리아'
        ],
        [Lang.CHN]: [
          '从业5年以上的企业并购业内专家。',
          '中华开发资本合伙人，隶属中华开发金融控股股份有限公司。',
          'KPMG Korea 资深跨境企业并购分析专家',
          'Deloitte Korea 企业并购专业顾问'
        ]
      }
    }
  ];

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.currentLang = this.translateService.currentLang;
      })
    );
  }


}
