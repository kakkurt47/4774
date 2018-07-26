import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';

declare const jQuery;

@Component({
  selector: 'app-intro-navbar',
  templateUrl: './intro-navbar.component.html',
  styleUrls: ['./intro-navbar.component.scss']
})
export class IntroNavbarComponent extends BaseComponent {
  lang: string;

  constructor(private translateService: TranslateService) {
    super();
  }

  moveToTop() {
    jQuery('html, body').stop().animate({ scrollTop: 0 }, 1000);
  }

  ngOnInit() {
    this.lang = this.translateService.currentLang;

    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.lang = this.translateService.currentLang;
      })
    );
  }

  changeLang(lang: 'en' | 'ko' | 'zh') {
    this.translateService.use(lang);
  }
}
