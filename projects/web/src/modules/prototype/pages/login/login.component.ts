import { Component, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MuzikaConsole, promisify } from '@muzika/core';
import { BaseComponent, ExtendedWeb3, MuzikaWeb3Service, UserActions } from '@muzika/core/angular';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'web-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class WebLoginPageComponent extends BaseComponent {
  selectedAccount: string;
  accounts: string[];

  isMetamaskConnected = false;

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

    this._getAccounts();

    this._sub.push(
      UserActions.currentUserObs.subscribe(user => {
        if (user) {
          this.router.navigateByUrl('/beta');
        }
      })
    );

    this._sub.push(
      interval(1000)
        .pipe(filter(() => !this.isMetamaskConnected))
        .subscribe(() => this._getAccounts())
    );
  }

  private _getAccounts() {
    this.web3Service.usingMetamask().subscribe(() => {
      this.isMetamaskConnected = true;
      promisify(this.web3.eth.getAccounts).then(accounts => {
        this.accounts = accounts;
      });
    }, () => {
      this.isMetamaskConnected = false;
    });
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
