import {Component, Inject} from '@angular/core';
import {IMuzikaCoin, MuzikaCoin} from '../../../contracts';
import {TruffleContract} from '../../../contracts/typechain-runtime';
import {BaseComponent} from '../../../shared/base.component';
import {Web3} from '../../../typings/web3';
import {promisify} from '../../../utils';
import {WEB3} from '../../web3.provider';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletPageComponent extends BaseComponent {
  balance: string;
  address: string;

  constructor(@Inject(WEB3) private web3: Web3,
              @Inject(MuzikaCoin) private muzikaCoin: TruffleContract<IMuzikaCoin>) {
    super();
  }

  ngOnInit() {
    this.loadAccount();
  }

  async loadAccount() {
    const coin = await this.muzikaCoin.deployed();
    this.address = (await promisify(this.web3.eth.getAccounts))[0];
    this.balance = this.web3.fromWei(await coin.balanceOf(this.address), 'ether').toString();
  }
}
