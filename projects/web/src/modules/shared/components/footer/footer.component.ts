import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, User, UserActions} from '@muzika/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent {
  constructor() {
    super();
  }
}
