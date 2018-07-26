import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../../../models/lang';
import { BaseComponent } from '../../../../models/base.component';

declare const jQuery;


/***
 * Creator: Sangmin Heo
 *
 * Reference: https://codyhouse.co/demo/horizontal-timeline/index.html
 * Horizontal timeline pure javascript code refactor to Angular
 */
@Component({
  selector: 'intro-roadmap',
  templateUrl: './mzk-intro-roadmap.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './horizontal-timeline.scss',
    './mzk-intro-roadmap.component.scss'
  ]
})
export class MzkIntroRoadmapComponent extends BaseComponent implements AfterViewInit {
  eventsMinDistance = 120;

  roadmaps = [];

  roadmaps_EN = [
    {
      topic: 'Conceptualization',
      list: [
        { date: '2017.02', text: 'Project conceptualized' }
      ]
    },
    {
      topic: 'System Modeling',
      list: [
        { date: '2017.07', text: 'Commencement of Platform Modeling' },
        { date: '2017.08', text: 'Establishment of three distinct models for coin economies of music' },
        { date: '2017.10', text: 'Decided upon development of current ecosystem model' }
      ]
    },
    {
      topic: 'Platform Testing',
      list: [
        { date: '2017.11', text: 'Open platform testing for transactions involving music sheets' },
        { date: '2017.12', text: 'Open platform testing for transactions of other digital music file types' },
        { date: '2018.02', text: 'Closed testing of the Muzika token (MZK)' }
      ]
    },
    {
      topic: 'Token Generation',
      current: true,
      list: [
        { date: '2018.Q2', text: 'Private sales' },
        { date: '2018.Q3', text: '​Exchange Listing' }
      ]
    },
    {
      topic: 'Ecosystem Launching',
      list: [
        { date: '2018.09', text: 'Launch of the Muzika Ecosystem prototype for testnet' },
        { date: '2018.11', text: 'Launch of the Muzika Ecosystem prototype for mainnet' },
        {
          date: '2018.12', text: 'Integrate Mapianist, MyMusicSheet, and other existing or ' +
          'soon-to-be-launched platforms developed by Mapiacompany to Muzika Ecosystem'
        },
        { date: '2019.01', text: 'Muzika Ecosystem beta launch (consumption-oriented)' },
        { date: '2019.02', text: 'Muzika Ecosystem beta launch (production-oriented)' },
        { date: '2019.04', text: 'Official global launch of the full-version of the Muzika Ecosystem' },
        { date: '2020-', text: 'The Muzika ecosystem begins reshaping the global music industry' }
      ]
    }
  ];

  roadmaps_ZH = [
    {
      topic: '项目执行计划',
      list: [
        { date: '2017.02', text: '项目概念雏形塑造期' }
      ]
    },
    {
      topic: '系统模型塑造期',
      list: [
        { date: '2017.07', text: '平台模型建成' },
        { date: '2017.08', text: '成功搭建3个不同的音乐代币经济模型' },
        { date: '2017.10', text: '最终确定现有生态系统模型的发展路线' }
      ]
    },
    {
      topic: '平台测试期',
      list: [
        { date: '2017.11', text: '包括乐谱在内的在线支付系统公开测试' },
        { date: '2017.12', text: '其它数字音乐格式文件在线支付系统的公开测试' },
        { date: '2018.02', text: 'Muzika代币（MZK）的平台封闭测试' }
      ]
    },
    {
      topic: '预售与私募',
      current: true,
      list: [
        { date: '2018.Q2', text: '私募' },
        { date: '2018.Q3', text: '​交易所上线' }
      ]
    },
    {
      topic: '生态系统的启动',
      list: [
        { date: '2018.09', text: ' Muzika 生态系统原型测试网的启动' },
        { date: '2018.11', text: ' Muzika 生态系统原型主网络的启动' },
        {
          date: '2018.12', text: '融合与对接Mapianist, MyMusicSheet 和其它Mapiacompany公司针对Muzika 生态系统而建成的各类平台'
        },
        { date: '2019.01', text: 'Muzi生态系统的测试版上线（消费导向）' },
        { date: '2019.02', text: 'Muzika 生态系统测试版上线（生产导向）' },
        { date: '2019.04', text: 'Muzika 生态系统完整版全球官网上线' },
        { date: '2020-', text: 'Muzika 数字音乐生态系统重塑全球音乐产业新格局' }
      ]
    }
  ];

  roadmaps_KR = [
    {
      topic: 'Conceptualization',
      list: [
        { date: '2017.02', text: '프로젝트 방향성 & 컨셉 기획' }
      ]
    },
    {
      topic: 'System Modeling',
      list: [
        { date: '2017.07', text: '플랫폼 모델 정립' },
        { date: '2017.08', text: '음악 코인 생태계를 위한 3가지 취득 모델 정립' },
        { date: '2017.10', text: '생태계 모델을 구현하기 위한 핵심 기술 개발 시작' }
      ]
    },
    {
      topic: 'Platform Testing',
      list: [
        { date: '2017.11', text: '악보 거래가 가능한 트랜젝션 (스마트 컨트랙트) 플랫폼 테스트 시작' },
        { date: '2017.12', text: '악보 외 음원, 디지털 음악 파일로 트랜젝션 유형 확장' },
        { date: '2018.02', text: 'Muzika 토큰에 대한 테스트 종료 (MZK)' }
      ]
    },
    {
      topic: 'Token Generation',
      current: true,
      list: [
        { date: '2018.Q2', text: '비공개 세일' },
        { date: '2018.Q3', text: '거래소 상장' }
      ]
    },
    {
      topic: 'Ecosystem Launching',
      list: [
        { date: '2018.09', text: 'Muzika 플랫폼을 이더리움 테스트넷 (Ropsten)에서 알파 런칭' },
        { date: '2018.11', text: 'Muzika 플랫폼을 이더리움 메인넷에서 알파 런칭' },
        { date: '2018.12', text: '마음만은 피아니스트, MyMusicSheet, KPopPiano 등 마피아컴퍼니가 운영하는 다른 플랫폼과 결제 수단 통합' },
        { date: '2019.01', text: 'Muzika 플랫폼 베타 런칭 1 (악보/음원 구매 중심)' },
        { date: '2019.02', text: 'Muzika 플랫폼 베타 런칭 2 (커뮤니티/보상 로직 중심)' },
        { date: '2019.03', text: 'Muzika 플랫폼 RC 런칭 3 (투자/분배 로직 중심)' },
        { date: '2019.04', text: 'Muzika 플랫폼의 글로벌 공식 버전 런칭' },
        { date: '2020-', text: '글로벌 음악 산업에서 뮤지카 플랫폼 안정화 및 시장 장악' }
      ]
    }
  ];

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.roadmaps = this.roadmaps_EN;
    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        switch (this.translateService.currentLang) {
          case Lang.KOR:
            this.roadmaps = this.roadmaps_KR;
            break;

          case Lang.CHN:
            this.roadmaps = this.roadmaps_ZH;
            break;

          default:
            this.roadmaps = this.roadmaps_EN;
        }
      })
    );
  }

  ngAfterViewInit() {
  }
}
