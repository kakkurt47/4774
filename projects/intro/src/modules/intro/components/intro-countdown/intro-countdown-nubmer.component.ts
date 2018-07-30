import { Component, Host, Input, OnChanges, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'mzk-intro-countdown-number',
  templateUrl: './intro-countdown-number.component.html',
  styleUrls: ['./intro-countdown-number.component.scss']
})
export class MzkIntroCountdownNumber extends BaseComponent implements OnChanges {
  @Input()
  num: number;

  _previousNumber: number = 0;

  animate = false;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.num) {
      let previousNumber = change.num.previousValue;
      let currentNumber = change.num.currentValue;

      if (currentNumber) {
        currentNumber = Math.floor(currentNumber) % 10;
      }

      if (previousNumber) {
        previousNumber = Math.floor(previousNumber) % 10;
      }

      this._previousNumber = previousNumber || 0;
      this.num = currentNumber || 0;
    } else {
      this.num = 0;
    }

    if (this._previousNumber !== this.num) {
      this.doAnimate();
    }
  }

  doAnimate() {
    this.animate = true;

    timer(600).subscribe(() => {
      this.animate = false;
    });
  }
}
