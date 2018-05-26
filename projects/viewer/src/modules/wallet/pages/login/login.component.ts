import {Component, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseComponent, promisify, ExtendedWeb3, MuzikaWeb3Service, UserActions} from '@muzika/core';
import * as _alertify from 'alertify.js';
import {Router} from '@angular/router';

const alertify = _alertify.okBtn('확인').cancelBtn('취소');

@Component({
  selector: 'app-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent extends BaseComponent {
  currentWalletProvider = 'metamask';

  @ViewChildren(NgForm)
  forms: QueryList<NgForm>;

  constructor(private userActions: UserActions,
              private router: Router,
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
