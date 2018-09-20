import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../../../models/lang';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'intro-token-metrics',
  templateUrl: './mzk-intro-token-metrics.component.html',
  styleUrls: [
    '../../scss/helper.scss',
    './mzk-intro-token-metrics.component.scss'
  ]
})
export class MzkIntroTokenMetricsComponent extends BaseComponent {
}
