import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, User, UserActions} from '@muzika/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {
  @select(['user', 'currentUser'])
  currentUserObs: Observable<User>;
  currentUser: User;

  constructor(private userActions: UserActions) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.currentUserObs.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  logout() {
    this.userActions.logout();
  }
}
