import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '@muzika/core';
import * as ethUtil from "ethereumjs-util";
import * as ethWallet from 'ethereumjs-wallet';
import {WalletStorageService} from '../../services/wallet-storage.service';

@Component({
  selector: 'wallet-list-page',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss']
})
export class WalletListComponent extends BaseComponent {
  accounts: string[] = [];
  selectedAccount: string;
  tx: any = {};

  constructor(private walletStorage: WalletStorageService) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.walletStorage.walletsObs.subscribe(privateKeys => {
        this.accounts = privateKeys.map(key => {
          const address = ethUtil.privateToAddress(ethUtil.toBuffer(key));

          return ethUtil.toChecksumAddress(ethUtil.bufferToHex(address));
        });
      })
    );
  }

  createWallet(): void {
    const wallet = ethWallet.generate();
    this.walletStorage.addWallet(ethUtil.bufferToHex(wallet.getPrivateKey()));
  }

  sendMZK(): void {
    // @TODO Implement send token and get balance of accounts
  }
}
