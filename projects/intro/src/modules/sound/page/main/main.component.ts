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

  ngOnInit() {
    super.ngOnInit();
  }
}
