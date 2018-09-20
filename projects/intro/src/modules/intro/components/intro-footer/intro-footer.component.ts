import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'app-intro-footer',
  templateUrl: './intro-footer.component.html',
  styleUrls: ['./intro-footer.component.scss']
})
export class IntroFooterComponent extends BaseComponent {
  lang = 'en';

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit(): void {
    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.lang = lang.lang;
      })
    );
  }

  changeLang(lang: 'en' | 'ko' | 'zh') {
    this.translateService.use(lang);
  }
}
