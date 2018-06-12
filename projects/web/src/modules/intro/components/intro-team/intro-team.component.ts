import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core';

@Component({
  selector: 'intro-team',
  templateUrl: './intro-team.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './intro-team.component.scss'
  ]
})
export class IntroTeamComponent extends BaseComponent {

  members: {
    name: string,
    position: string,
    image: string
  }[] = [
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
      position: 'Lead Blockchain Architecture',
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

}
