import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';

@Component({
  selector: 'app-intro-footer',
  templateUrl: './intro-footer.component.html',
  styleUrls: ['./intro-footer.component.scss']
})
export class IntroFooterComponent extends BaseComponent {
  constructor() {
    super();
  }
}
