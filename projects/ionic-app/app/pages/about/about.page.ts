import {Component} from '@angular/core';
import {BaseComponent, MuzikaWeb3Service} from '@muzika/core';

@Component({
  selector: 'app-page-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class WalletPageComponent extends BaseComponent {
  constructor(private web3Service: MuzikaWeb3Service) {
  }

  ngOnInit() {
    super.ngOnInit();
    this.web3Service.getTransactions();
  }


}
