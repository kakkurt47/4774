import { Component } from '@angular/core';
import { BaseComponent, UserActions } from '@muzika/core/angular';
import { User } from '@muzika/core';


@Component({
  selector: 'muzika-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class UserSettingsComponent extends BaseComponent {
  currentUser: User;

  constructor(private userActions: UserActions) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      UserActions.currentUserObs
        .subscribe(user => {
          this.currentUser = user;
        })
    );
  }
}
