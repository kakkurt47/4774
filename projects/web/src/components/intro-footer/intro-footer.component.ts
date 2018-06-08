import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, User, UserActions} from '@muzika/core';
import {Observable} from 'rxjs';

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
