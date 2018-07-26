import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'app-intro-footer',
  templateUrl: './intro-footer.component.html',
  styleUrls: ['./intro-footer.component.scss']
})
export class IntroFooterComponent extends BaseComponent {
  constructor(private translateService: TranslateService) {
    super();
  }

  changeLang(lang: 'en' | 'ko' | 'zh') {
    this.translateService.use(lang);
  }
}
