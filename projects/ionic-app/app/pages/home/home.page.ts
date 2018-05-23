import { Component } from '@angular/core';
import {BaseComponent, ExtendedWeb3, MuzikaCoin, promisify, AddressOnlyProvider} from '@muzika/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import * as _alertify from 'alertify.js';

const alertify = _alertify.okBtn('확인').cancelBtn('취소');

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePageComponent extends BaseComponent {
  balance = '0.000000000';
  address: string;
  stepTransfer = false;

  toAddress: string;
  amount: number;
  gasLimit = 54000;
  gasPrice = 8;
  agreeTransfer = false;

  supportTransfer = false;

  constructor(private web3: ExtendedWeb3,
              private muzikaCoin: MuzikaCoin,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.web3.currentProvider) {
      this.router.navigate(['/']);
      return;
    }
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
      } else {
        if (form.controls.toAddress.invalid) {
          alertify.alert('받는주소가 올바르지 않습니다');
        } else if (form.controls.amount.invalid) {
          alertify.alert('보내는 수량이 올바르지 않습니다');
        } else if (form.controls.gasLimit.invalid || form.controls.gasPrice.invalid) {
          alertify.alert('가스한도 및 가스 가격을 확인해주세요');
        } else {
          alertify.alert('보내는 정보가 맞는지 확인하시고, 확인 여부에 체크해주세요');
        }
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

    return await coin.transfer(this.toAddress, mzk, {from: this.address, gas: this.gasLimit, gasPrice: gasPrice});
  }
}
