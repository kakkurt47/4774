import {Component} from '@angular/core';
import {BaseComponent} from '../../../shared/base.component';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletPageComponent extends BaseComponent {
  constructor() {
    super();
  }
}
