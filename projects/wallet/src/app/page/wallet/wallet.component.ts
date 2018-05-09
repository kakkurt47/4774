import {Component, Inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AddressOnlyProvider, IMuzikaCoin, MuzikaCoin, TruffleContract, Web3, WEB3} from '@muzika/core';
import {BaseComponent} from '../../../shared/base.component';
import {promisify} from '../../../utils';
import * as _alertify from 'alertify.js';

const alertify = _alertify.okBtn('확인').cancelBtn('취소');

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
  agreeTransfer = false;

  supportTransfer = false;

  constructor(@Inject(WEB3) private web3: Web3,
              @Inject(MuzikaCoin) private muzikaCoin: TruffleContract<IMuzikaCoin>) {
    super();
  }

  ngOnInit(): void {
    this.loadAccount();
    this.supportTransfer = !(this.web3.currentProvider instanceof AddressOnlyProvider);
  }

  async loadAccount() {
    const coin = await this.muzikaCoin.deployed();
    this.address = (await promisify(this.web3.eth.getAccounts))[0];
    this.balance = this.web3.fromWei(await coin.balanceOf(this.address), 'ether').toString();
  }

  transfer(form?: NgForm) {
    if (!this.stepTransfer) {
      this.stepTransfer = true;
      this.toAddress = null;
      this.amount = null;
      this.agreeTransfer = false;
    } else {
      if (form && form.valid) {
        this._transferPerform().then(() => {
          alertify.alert('전송되었습니다');
          this.loadAccount();
          this.agreeTransfer = false;
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
    const data = <any>coin.transfer.request(this.toAddress, mzk);
    const transaction = {
      from: this.address,
      to: coin.address,
      gas: this.gasLimit,
      gasPrice: gasPrice,
      data: data.params[0].data
    };

    return await promisify(this.web3.eth.sendTransaction, transaction);
  }
}
