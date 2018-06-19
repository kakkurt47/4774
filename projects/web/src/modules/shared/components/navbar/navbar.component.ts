import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {User} from '@muzika/core';
import {BaseComponent, UserActions} from '@muzika/core/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {
  currentUser: User;

  constructor(private userActions: UserActions) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      UserActions.currentUserObs.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  logout() {
    this.userActions.logout();
  }
}
