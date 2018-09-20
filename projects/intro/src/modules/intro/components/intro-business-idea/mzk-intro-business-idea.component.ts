import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../../../models/lang';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'intro-business-idea',
  templateUrl: './mzk-intro-business-idea.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-business-idea.component.scss'
  ]
})
export class MzkIntroBusinessIdeaComponent extends BaseComponent {
}
