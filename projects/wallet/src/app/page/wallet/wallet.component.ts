import {Component, Inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IMuzikaCoin, MuzikaCoin} from '../../../contracts';
import {TruffleContract} from '../../../contracts/typechain-runtime';
import {BaseComponent} from '../../../shared/base.component';
import {promisify} from '../../../utils';
import {WEB3} from '../../web3.provider';
import {Web3} from '../../../typings/web3';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletPageComponent extends BaseComponent {
  balance: string;
  address: string;
  stepTransfer = false;

  toAddress: string;
  amount: number;
  gasLimit: number = 54000;
  gasPrice: number = 8;

  constructor(@Inject(WEB3) private web3: Web3,
              @Inject(MuzikaCoin) private muzikaCoin: TruffleContract<IMuzikaCoin>) {
    super();
  }

  ngOnInit(): void {
    this.loadAccount();
    console.log(this.web3);
  }

  async loadAccount() {
    const coin = await this.muzikaCoin.deployed();
    this.address = (await promisify(this.web3.eth.getAccounts))[0];
    this.balance = this.web3.fromWei(await coin.balanceOf(this.address), 'ether').toString();
  }

  transfer(form?: NgForm) {
    if (!this.stepTransfer) {
      this.stepTransfer = true;
    } else {
      if (form && form.valid) {
        this._transferPerform().then(() => {
          alert('Success');
        });
      }
    }
  }

  reset() {
    this.stepTransfer = false;
  }

  private async _transferPerform() {
    const mzk = this.web3.toWei(this.amount, 'ether');
    const gasPrice = this.web3.toWei(this.gasPrice, 'gwei');
    const coin = await this.muzikaCoin.deployed();
    console.log(coin.transfer.estimateGas(this.address, mzk));
    const data = <any>coin.transfer.request(this.toAddress, mzk);
    const transaction = {
      from: this.address,
      to: coin.address,
      gas: this.gasLimit,
      gasPrice: gasPrice,
      data: data.params[0].data
    };

    console.log(transaction);
    return await promisify(this.web3.eth.sendTransaction, transaction);
  }
}
