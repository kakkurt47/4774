import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { timer } from 'rxjs';
import { BaseComponent } from '../../../../models/base.component';
import { Lang } from '../../../../models/lang';

@Component({
  selector: 'mzk-intro-countdown',
  templateUrl: './intro-countdown.component.html',
  styleUrls: ['./intro-countdown.component.scss']
})
export class MzkIntroCountdownComponent extends BaseComponent {
  currentLang: string = Lang.ENG;

  @Input()
  expiredDate: Date;

  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;

  private _currentDate: Date;
  private _diffTimestamp: number = 0;

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.currentLang = this.translateService.currentLang || Lang.ENG;
      })
    );

    this._currentDate = new Date();
    this._diffTimestamp = this.expiredDate.getTime() - this._currentDate.getTime();

    timer(0, 1000).subscribe(() => {
      let diffTimestamp = this._diffTimestamp;

      if (diffTimestamp < 0) {
        // Coming soon...
      } else {
        diffTimestamp /= 1000;

        this.secondsLeft = diffTimestamp % 60;
        diffTimestamp = Math.floor(diffTimestamp / 60);

        this.minutesLeft = diffTimestamp % 60;
        diffTimestamp = Math.floor(diffTimestamp / 60);

        this.hoursLeft = diffTimestamp % 24;
        diffTimestamp = Math.floor(diffTimestamp / 24);

        this.daysLeft = diffTimestamp;

        this._diffTimestamp -= 1000;
      }
    });

    timer(0, 3 * 60 * 1000).subscribe(() => {
      this._currentDate = new Date();
      this._diffTimestamp = this.expiredDate.getTime() - this._currentDate.getTime();
    });
  }
}
