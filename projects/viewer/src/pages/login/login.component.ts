import { Component, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MuzikaConsole, promisify } from '@muzika/core';
import { BaseComponent, ExtendedWeb3, MuzikaWeb3Service, UserActions } from '@muzika/core/angular';

@Component({
  selector: 'app-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent extends BaseComponent {
  currentWalletProvider = 'private';
  selectedAccount: string;
  accounts: string[];

  @ViewChildren(NgForm)
  forms: QueryList<NgForm>;

  constructor(private userActions: UserActions,
              private router: Router,
              private route: ActivatedRoute,
              private web3Service: MuzikaWeb3Service,
              private web3: ExtendedWeb3) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    promisify(this.web3.eth.getAccounts).then(accounts => {
      this.accounts = accounts;
    });
  }


  login() {
    // this.userActions.login('metamask').subscribe();
    this.userActions.login(this.selectedAccount).subscribe(
      user => {
        MuzikaConsole.log(user);
        const redirectTo = this.route.snapshot.queryParams['redirectTo'] || '/';
        this.router.navigateByUrl(redirectTo);
      },
      error => {
        MuzikaConsole.error(error);
      }
    );
  }
}
