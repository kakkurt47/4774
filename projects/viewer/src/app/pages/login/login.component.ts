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
    const messagePrefix = `Login to Muzika!\nSignature: `;
    this.web3Service.usingMetamask().pipe(
      concatMap(accounts => {
        return this.userActions.getLoginMessage(accounts[0]).pipe(
          map(message => {
            return {address: accounts[0], message};
          })
        );
      }),
      concatMap(({address, message}) => {
        return from(promisify(
          this.web3.personal.sign,
          this.web3.toHex(messagePrefix + message),
          address
        )).pipe(
          map(signature => {
            return {address, message, signature};
          })
        );
      }),
      concatMap(({address, message, signature}) => {
        return this.userActions.login(address, message, signature);
      })
    ).subscribe();
  }
}
