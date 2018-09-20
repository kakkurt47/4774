import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../../../models/lang';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'intro-roadmap-img',
  templateUrl: './mzk-intro-roadmap-img.component.html',
  styleUrls: [
    './mzk-intro-roadmap-img.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MzkIntroRoadmapImageComponent extends BaseComponent implements OnChanges {
  @Input()
  active: number;

  @Input()
  topic: string[];

  @Input()
  desc: string[];

  quarters = 16;

  quarterDivIdx = [0, 1, 4, 7, 9];

  quarterInfo: {name: string, strong?: boolean }[] = [
    { name: '02.17', strong: true },
    { name: '07.17', strong: true },
    { name: '08.17' },
    { name: '10.17' },
    { name: '11.17', strong: true },
    { name: '12.17' },
    { name: '02.18' },
    { name: 'Q2.18', strong: true },
    { name: 'Q3.18' },
    { name: '09.18', strong: true },
    { name: '11.18' },
    { name: '12.18' },
    { name: '01.19' },
    { name: '02.19' },
    { name: '04.19' },
    { name: '2020+' }
  ];

  quarterPos: {x: number, y: number}[] = [
    {x: 20.57, y: 570},
    {x: 100.57, y: 557},
    {x: 180.57, y: 543},
    {x: 260.57, y: 531},
    {x: 340.57, y: 525},
    {x: 420.57, y: 517},
    {x: 500.57, y: 499},
    {x: 580.57, y: 475},
    {x: 660.57, y: 443},
    {x: 740.57, y: 409},
    {x: 820.57, y: 368},
    {x: 900.57, y: 328},
    {x: 980.57, y: 276},
    {x: 1060.57, y: 249},
    {x: 1140.57, y: 211},
    {x: 1220.57, y: 123}
  ];

  quarterColorClass: {stroke: string, fill: string}[];

  quarterDescLinePoint: string[];

  quarterDescCirclePoint: {x: number, y: number}[];

  quarterDescLineDiff: {dx: number, dy: number}[][] = [
    [{dx: 0, dy: -100}],
    [{dx: 0, dy: 45}],
    [{dx: 0, dy: -92}],
    [{dx: 0, dy: 51}],
    [{dx: 0, dy: -87}],
    [{dx: 0, dy: 71}],
    [{dx: 0, dy: -90}],
    [{dx: 0, dy: 56}],
    [{dx: 0, dy: -65}],
    [{dx: 0, dy: 51}],
    [{dx: -80, dy: -33}, {dx: 0, dy: -81}],
    [{dx: 0, dy: 40}],
    [{dx: -131, dy: -37}, {dx: 0, dy: -62}],
    [{dx: 0, dy: 42}],
    [{dx: -117, dy: -23}, {dx: 0, dy: -50}],
    [{dx: -177, dy: -36}, {dx: 0, dy: -63}]
  ];

  marginQuarterDesc = 12;
  lineHeightQuarterDesc = 17;
  convertedQuarterDesc: string[][];

  // quarterPos: number[];
  // linePointPos: number[] = [570, 557, 543, 531, 525, 517, 499, 475, 443, 409, 368, 328, 276, 249, 211, 123];
  polylinePoint: string;

  spinnerPos: {x: number, y: number} = {x: 0, y: 0};
  spinnerVisible = false;

  constructor(private translateService: TranslateService) {
    super();

    this.quarterColorClass = this.quarterPos.map((_, i) => {
      return {
        stroke: `svg-stroke-color-${this.getQuarterColor(i)}`,
        fill: `svg-fill-color-${this.getQuarterColor(i)}`
      };
    });

    this.polylinePoint = this.quarterPos.map(({x, y}) => `${x} ${y}`).join(" ");

    this.quarterDescCirclePoint = [];
    this.quarterDescLinePoint = this.quarterPos.map((pos, i) => {
      let res = `${pos.x} ${pos.y}`;
      let cx = pos.x, cy = pos.y;

      this.quarterDescLineDiff[i].forEach(cur => {
        cx += cur.dx;
        cy += cur.dy;
        res = `${res} ${cx} ${cy}`
      });

      this.quarterDescCirclePoint.push({x: cx, y: cy});

      return res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desc']) {
      let currentDesc = changes['desc'].currentValue;
      if (currentDesc) {
        this.convertedQuarterDesc = currentDesc.map((desc: string) => {
          return desc.split('\n').map(s => s.trim());
        });
      }
    }

    if (changes['active']) {
      this.setSpinnerStatus(changes['active'].currentValue);
    }
  }

  private setSpinnerStatus(position: number) {
    if (position >= 0 && position < this.quarters) {
      this.spinnerPos.x = this.quarterPos[position].x;
      this.spinnerPos.y = this.quarterPos[position].y;
      this.spinnerVisible = true;
    } else {
      this.spinnerVisible = false;
    }
  }

  private getQuarterColor(idx: number): number {
    if (idx >= this.quarterDivIdx[4]) {
      return 5;
    } else if (idx >= this.quarterDivIdx[3]) {
      return 4;
    } else if (idx >= this.quarterDivIdx[2]) {
      return 3;
    } else if (idx >= this.quarterDivIdx[1]) {
      return 2;
    } else if (idx >= this.quarterDivIdx[0]) {
      return 1;
    }
  }
}
