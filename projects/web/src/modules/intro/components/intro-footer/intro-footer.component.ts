import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-intro-footer',
  templateUrl: './intro-footer.component.html',
  styleUrls: ['./intro-footer.component.scss']
})
export class IntroFooterComponent extends BaseComponent {
  constructor(private translateService: TranslateService) {
    super();
  }

  changeLang(lang: 'en' | 'ko' | 'ch') {
    this.translateService.use(lang);
  }
}
