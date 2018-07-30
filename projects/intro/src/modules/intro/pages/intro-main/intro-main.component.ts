import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../../../../models/base.component';

declare const jQuery;

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

  constructor(private http: HttpClient) {
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
    this.macDownloadURL = 'https://s3.amazonaws.com/muzika-release/studio/darwin/Muzika-0.0.9-mac.zip';
    this.linuxDownloadURL = 'https://release.muzika.network/studio/linux/muzika-0.0.9-x86_64.AppImage';
    this.winDownloadURL = 'https://s3.amazonaws.com/muzika-release/studio/win-x64/Muzika+Setup+0.0.9.exe';
  }
}
