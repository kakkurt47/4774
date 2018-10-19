import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'app-intro-main',
  templateUrl: './intro-main.component.html',
  styleUrls: [
    '../../scss/cta.scss',
    '../../scss/helper.scss',
    './intro-main.component.scss'
  ]
})
export class IntroMainPageComponent extends BaseComponent {
  macDownloadURL: string;
  winDownloadURL: string;
  linuxDownloadURL: string;
  lang: string;

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    // jQuery
    //   .getJSON('https://release.muzika.network/studio/darwin/latest-mac.json')
    //   .then(macInfo => {
    //     console.log(macInfo);
    //     if (macInfo && macInfo.url) {
    //       this.macDownloadURL = macInfo.url;
    //     }
    //   });
    this.macDownloadURL = 'https://s3.amazonaws.com/muzika-release/studio/darwin/Muzika-0.1.0.dmg';
    this.linuxDownloadURL = 'https://release.muzika.network/studio/linux/muzika-0.1.0-x86_64.AppImage';
    this.winDownloadURL = 'https://s3.amazonaws.com/muzika-release/studio/win-x64/Muzika+Setup+0.1.0.exe';

    this._sub.push(
      this.translateService.onLangChange.subscribe(({ lang }) => {
        this.lang = lang;
      })
    );
  }
}
