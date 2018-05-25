import {Component} from '@angular/core';
import {BaseComponent, UserActions} from '@muzika/core';

@Component({
  selector: 'app-page-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class WalletPageComponent extends BaseComponent {
  public address: string;

  constructor(private userActions: UserActions) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
