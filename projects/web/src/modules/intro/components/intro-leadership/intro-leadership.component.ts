import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core';

@Component({
  selector: 'intro-leadership-team',
  templateUrl: './intro-leadership.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './intro-leadership.component.scss'
  ]
})
export class IntroLeadershipComponent extends BaseComponent {
  leaders: any[] = [
    {
      name: 'Inseo Chung',
      imagePath: 'assets/images/leader-inseo.png',
      position: 'CEO',
      sentences: [
        'Forbes 30 under 30 Asia 2018',

        'A once aspiring pianist and a 2nd place winner of the National Student Music Competition, ' +
        'Inseo Chung changed his course of life when he found his zeal to be more towards business. ' +
        'After dropping out of high school and finishing high school course with national substitute exam, ' +
        'he decided against going to college, and instead went on to become a serial entrepreneur, ' +
        'building an e-commerce startup and a prominent social media marketing agency.',

        'Mapiacompany is his third venture and an epitome of his experience as both a young but seasoned entrepreneur ' +
        'and a once-aspirant musician. ' +
        'He came across the blockchain in 2015 and studied various aspects of its business applications since, ' +
        'while directly taking part in the industry as one of the earlier miners of Ethereum.'
      ]
    },
    {
      name: 'Sangmin Heo',
      imagePath: 'assets/images/leader-sangmin.png',
      position: 'CTO',
      sentences: [
        'Forbes 30 under 30 Asia 2018',

        'A prodigy programmer and developer who built his web game and earned a small fortune at the age of 15. ' +
        'A winner of multiple awards including the Korean Olympiad in Informatics(2nd Prize), ' +
        'Korea Intel Science Engineering Fair(1st Prize). ' +
        'A national candidate for Intel Science Fair International Competition Software Division. ' +
        'An academically recognized researcher of the 28th HCLT Esteemed Research Paper ' +
        'for research on Deep Learning and Natural Language Processing. ' +
        'The sole developer and owner of the famous Korean college-based social media ‘The Bamboo Network’.',

        'These and words like brilliant, determined, full-stack, well-versed, are yet but a fraction of Sangmin’s capacity. ' +
        'A young expert in both deep learning and blockchain, he is the mind and the leader of the top-notch tech team of eight. ' +
        'Alumni of Hanyang University, computer science major.'
      ]
    },
    {
      name: 'Jangwon Lee',
      imagePath: 'assets/images/leader-jangwon.png',
      position: 'COO',
      sentences: [
        'Forbes 30 under 30 Asia 2018',

        'The top graduate of the most prestigious high school and university of the nation, ' +
        'Daewon Foreign Language High School and Seoul National University(business administration major), ' +
        'and a winner of multiple awards spanning diverse areas of academia from language studies to economics ' +
        'and business administration to art management, Jangwon is one of the top talent of his generation.',

        'Besides his illustrious educational background, he is also a professional pianist, ' +
        'and an experienced leader in business development. He founded Piano Group The Serendipity, ' +
        'a professional piano group well-known in Korea for piano duets, co-founded YouthGlobe Korea, ' +
        'the Korean division of the international NGO YouthGlobe which aims to enhance educational conditions in Burundi, ' +
        'co-founded Shadal Inc., the largest college-based food delivery mobile application in Korea, and co-founded Mapiacompany ' +
        '– all during his college years.'
      ]
    }
  ];
}
