import { Component, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MuzikaConsole, promisify } from '@muzika/core';
import { BaseComponent, ExtendedWeb3, MuzikaWeb3Service, UserActions } from '@muzika/core/angular';

@Component({
  selector: 'web-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class WebLoginPageComponent extends BaseComponent {
  selectedAccount: string;
  accounts: string[];

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

    this.web3Service.usingMetamask().subscribe(() => {
      promisify(this.web3.eth.getAccounts).then(accounts => {
        this.accounts = accounts;
      });
    });

    this._sub.push(
      UserActions.currentUserObs.subscribe(user => {
        if (user) {
          this.router.navigateByUrl('/beta');
        }
      })
    );
  }

  login() {
    this.userActions.login(this.selectedAccount).subscribe(
      user => {
        MuzikaConsole.log('Success to sign in, it will automatically move to main');
      },
      error => {
        MuzikaConsole.error(error);
      }
    );
  }
}
