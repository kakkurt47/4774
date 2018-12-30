import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';
import { Lang } from '../../../../models/lang';
import { SimpleMDConverterPipe } from '../../../shared/md-convert.pipe';

@Component({
  selector: 'mzk-sound-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SimpleMDConverterPipe]
})
export class SoundMainPageComponent extends BaseComponent {
  openedQNA = '';
  currentLang = Lang.ENG;

  constructor(private translateService: TranslateService,
              private mdConvertPipe: SimpleMDConverterPipe) {
    super();
  }

  qnaClick(type) {
    if (this.openedQNA === type) {
      this.openedQNA = '';
    } else {
      this.openedQNA = type;
    }
  }

  open() {
    switch (this.currentLang) {
      case Lang.ENG:
        window.open('https://play.google.com/apps/testing/network.muzika.streaming');
        break;
      case Lang.CHN:
        window.open('https://play.google.com/apps/testing/network.muzika.streaming');
        break;
      case Lang.KOR:
        window.open('https://play.google.com/apps/testing/network.muzika.streaming');
        break;
      default:
        window.open('https://play.google.com/apps/testing/network.muzika.streaming');
    }
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      this.translateService.onLangChange.subscribe(({lang}) => {
        this.currentLang = lang;
      })
    );

  }
}
