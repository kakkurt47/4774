import { Component } from '@angular/core';
import { BaseComponent, UserActions } from '@muzika/core/angular';


@Component({
  selector: 'muzika-user-settings',
  templateUrl: './settings.component.html'
})
export class UserSettingsComponent extends BaseComponent {
  constructor(private userActions: UserActions) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

  }
}
