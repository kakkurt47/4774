import {Component} from '@angular/core';
import {BaseComponent, promisify, ExtendedWeb3, MuzikaWeb3Service, UserActions} from '@muzika/core';
import {from} from 'rxjs';
import {concatMap, map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent extends BaseComponent {
  constructor(private userActions: UserActions,
              private web3Service: MuzikaWeb3Service,
              private web3: ExtendedWeb3) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  login() {
    this.userActions.login('metamask').subscribe();
  }
}
