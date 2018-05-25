import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, ExtendedWeb3, MuzikaWeb3Service, promisify, User, UserActions} from '@muzika/core';
import {Observable, from} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {
  @select(['user', 'currentUser'])
  currentUserObs: Observable<User>;
  currentUser: User;

  constructor(private userActions: UserActions,
              private web3Service: MuzikaWeb3Service,
              private web3: ExtendedWeb3) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.currentUserObs.subscribe(user => {
        this.currentUser = user;
      })
    );
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
