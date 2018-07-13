import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '@muzika/core';

export interface MuzikaMember {
  name: string;
  position: string;
  image: string;
}

@Component({
  selector: 'intro-team',
  templateUrl: './mzk-intro-team.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-team.component.scss'
  ]
})
export class MzkIntroTeamComponent extends BaseComponent {
  members: MuzikaMember[] = [];

  members_EN: MuzikaMember[] = [
    {
      name: 'Seungwon Kang',
      position: 'Blockchain Engineer',
      image: '강승원.jpg'
    },
    {
      name: 'Chaehong Jeong',
      position: 'Blockchain Engineer',
      image: '정채홍.jpg'
    },
    {
      name: 'Jungwoo Lee',
      position: 'Lead Blockchain Architect',
      image: '이정우.jpg'
    },
    {
      name: 'Jihyun Kim',
      position: 'DevOps/Server Engineer',
      image: '김지현.jpg'
    },
    {
      name: 'Hyunju Hwang',
      position: 'Frontend Developer',
      image: '황현주.jpg'
    },
    {
      name: 'Kyunghee Chang',
      position: 'Frontend Developer',
      image: '장경희.jpg'
    },
    {
      name: 'Jaechan Ahn',
      position: 'AI/ML Researcher & Server Developer',
      image: '안재찬.jpg'
    },
    {
      name: 'Minkyung Lee',
      position: 'Brand & UX Designer',
      image: '이민경.jpg'
    },
    {
      name: 'Sukyung Na',
      position: 'Head of Global Business',
      image: '나수경.jpg'
    },
    {
      name: 'William Wu',
      position: 'Head of Global PR',
      image: '윌리엄.jpg'
    },
    {
      name: 'Yeji Chung',
      position: 'Head of Music Management',
      image: '정예지.jpg'
    },
    {
      name: 'Seongheon Cho',
      position: 'Head of Compliance',
      image: '조성헌.jpg'
    }
  ];

  members_ZH: MuzikaMember[] = [
    {
      name: 'Seungwon Kang',
      position: 'Blockchain Engineer',
      image: '강승원.jpg'
    },
    {
      name: 'Chaehong Jeong',
      position: 'Blockchain Engineer',
      image: '정채홍.jpg'
    },
    {
      name: 'Jungwoo Lee',
      position: 'Lead Blockchain Architect',
      image: '이정우.jpg'
    },
    {
      name: 'Jihyun Kim',
      position: 'DevOps/Server Engineer',
      image: '김지현.jpg'
    },
    {
      name: 'Hyunju Hwang',
      position: 'Frontend Developer',
      image: '황현주.jpg'
    },
    {
      name: 'Kyunghee Chang',
      position: 'Frontend Developer',
      image: '장경희.jpg'
    },
    {
      name: 'Jaechan Ahn',
      position: 'AI/ML Researcher & Server Developer',
      image: '안재찬.jpg'
    },
    {
      name: 'Minkyung Lee',
      position: 'Brand & UX Designer',
      image: '이민경.jpg'
    },
    {
      name: 'Sukyung Na',
      position: 'Head of Global Business',
      image: '나수경.jpg'
    },
    {
      name: 'William Wu',
      position: 'Head of Global PR',
      image: '윌리엄.jpg'
    },
    {
      name: 'Yeji Chung',
      position: 'Head of Music Management',
      image: '정예지.jpg'
    },
    {
      name: 'Seongheon Cho',
      position: 'Head of Compliance',
      image: '조성헌.jpg'
    }
  ];

  members_KR: MuzikaMember[] = [
    {
      name: '강승원',
      position: '블록체인 엔지니어 (P2P)',
      image: '강승원.jpg'
    },
    {
      name: '정채홍',
      position: '블록체인 엔지니어 (Core)',
      image: '정채홍.jpg'
    },
    {
      name: '이정우',
      position: '블록체인 설계 리더',
      image: '이정우.jpg'
    },
    {
      name: '김지현',
      position: 'DevOps 엔지니어',
      image: '김지현.jpg'
    },
    {
      name: '황현주',
      position: '프론트엔드 개발자',
      image: '황현주.jpg'
    },
    {
      name: '장경희',
      position: '프론트엔드 개발자',
      image: '장경희.jpg'
    },
    {
      name: '안재찬',
      position: 'AI/ML 연구 & 서버 개발자',
      image: '안재찬.jpg'
    },
    {
      name: '이민경',
      position: '브랜드 & UX 디자이너',
      image: '이민경.jpg'
    },
    {
      name: '나수경',
      position: '글로벌 비즈니스 총괄',
      image: '나수경.jpg'
    },
    {
      name: 'William Wu',
      position: '글로벌 PR 총괄',
      image: '윌리엄.jpg'
    },
    {
      name: '정예지',
      position: '커뮤니티 매니지먼트 및 음악 사업 담당',
      image: '정예지.jpg'
    },
    {
      name: 'Seongheon Cho',
      position: 'Head of Compliance',
      image: '조성헌.jpg'
    }
  ];

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.members = this.members_EN;
    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        switch (this.translateService.currentLang) {
          case Lang.KOR:
            this.members = this.members_KR;
            break;

          case Lang.CHN:
            this.members = this.members_ZH;
            break;

          default:
            this.members = this.members_EN;
        }
      })
    );
  }
}
