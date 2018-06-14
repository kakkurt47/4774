import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {User} from '@muzika/core';
import {BaseComponent, UserActions} from '@muzika/core/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-intro-navbar',
  templateUrl: './intro-navbar.component.html',
  styleUrls: ['./intro-navbar.component.scss']
})
export class IntroNavbarComponent extends BaseComponent {
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
