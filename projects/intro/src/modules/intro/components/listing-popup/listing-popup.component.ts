import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';
import { Lang } from '../../../../models/lang';


@Component({
  selector: 'mzk-listing-popup',
  templateUrl: './listing-popup.component.html',
  styleUrls: ['./listing-popup.component.scss']
})
export class ListingPopupComponent extends BaseComponent {
  isShow = true;
  hidepopup = false;
  currentLang = Lang.ENG;

  popupImgFile = 'popup-en.png';

  messages = {
    [Lang.ENG]: {
      close: 'Close',
      hideMsg: 'Don\'t show this again'
    },
    [Lang.CHN]: {
      close: '关闭',
      hideMsg: '不再显示'
    },
    [Lang.KOR]: {
      close: '닫기',
      hideMsg: '하루동안 보지않기'
    }
  };

  constructor(private translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.translateService.onLangChange.subscribe(({lang}) => {
        this.currentLang = lang;
        this.popupImgFile = `popup-${lang}.png`;
      })
    );

    if (isPlatformBrowser(this.platformId)) {
      if (this.getCookie('popup-listing-notice') === 'done') {
        this.isShow = false;
      }
    }
  }

  open() {
    switch (this.currentLang) {
      case Lang.ENG:
        window.open('https://www.huobi.co.kr/en-US/notices/388');
        break;
      case Lang.CHN:
        window.open('https://www.huobi.co.kr/zh-CN/notices/388');
        break;
      case Lang.KOR:
        window.open('https://www.huobi.co.kr/ko-KR/notices/387');
        break;
      default:
        window.open('https://www.huobi.co.kr/ko-KR/notice/');
    }
  }

  close() {
    if (this.hidepopup) {
      this.setCookie('popup-listing-notice', 'done', 1);
    }
    this.isShow = false;
  }

  getCookie(name: string) {
    const nameOfCookie = `${name}=`;
    let x = 0;

    while (x <= document.cookie.length) {
      const y = (x + nameOfCookie.length);

      if (document.cookie.substring(x, y) === nameOfCookie) {
        let endOfCookie = document.cookie.indexOf(';', y);
        if (endOfCookie === -1) {
          endOfCookie = document.cookie.length;
        }

        return decodeURIComponent(document.cookie.substring(y, endOfCookie));
      }

      x = document.cookie.indexOf(' ', x) + 1;
      if (x === 0) {
        break;
      }
    }

    return '';
  }

  setCookie(name: string, value: string, expireDays: number) {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expireDays);
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${todayDate.toUTCString()};`;
  }
}
