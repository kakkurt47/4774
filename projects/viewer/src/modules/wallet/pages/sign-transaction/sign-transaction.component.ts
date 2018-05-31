import {TxData} from '@0xproject/types';
import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core';
import {default as BigNumber} from 'bignumber.js';
import * as EthTx from "ethereumjs-tx";
import * as ethUtil from "ethereumjs-util";
import {WalletStorageService} from '../../services/wallet-storage.service';

@Component({
  selector: 'wallet-sign-transaction',
  templateUrl: './sign-transaction.component.html',
  styleUrls: ['./sign-transaction.component.scss']
})
export class WalletSignTransactionComponent extends BaseComponent {
  currentEvent: any;
  currentTx: any;

  constructor(private walletStorage: WalletStorageService) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.walletStorage.eventSignTransaction.subscribe(e => {
        if (e) {
          this.currentEvent = e.event;
          this.currentTx = e.txData;

          this.currentTx.value = this.hexToNumber(this.currentTx.value);
          this.currentTx.gas = this.hexToNumber(this.currentTx.gas || this.currentTx.gasLimit);
          this.currentTx.gasPrice = this.hexToNumber(this.currentTx.gasPrice);
        } else {
          this.currentEvent = null;
          this.currentTx = null;
        }
      })
    );
  }

  sign() {
    this.currentTx.value = this.numberToHex(this.currentTx.value);
    this.currentTx.gasPrice = this.numberToHex(this.currentTx.gasPrice);
    this.currentTx.gasLimit = this.numberToHex(this.currentTx.gasLimit || this.currentTx.gas || '0x00');
    this.currentTx.gas = this.numberToHex(this.currentTx.gas || this.currentTx.gasLimit || '0x00');

    this.currentTx.value = this.currentTx.value || '0x00';
    this.currentTx.data = ethUtil.addHexPrefix(this.currentTx.data);

    const privateKey = this.walletStorage.privateKeyOf(this.currentTx.from);

    const tx = new EthTx(this.currentTx);
    tx.sign(privateKey);

    this.currentEvent.sender.send('Wallet:signTransaction:received', null, '0x' + tx.serialize().toString('hex'));
    this.walletStorage.emitReadySignTransaction(null);
  }

  hexToNumber(value: string): string {
    return new BigNumber(value, 16).toString();
  }

  numberToHex(value: string): string {
    return '0x' + new BigNumber(value).toString(16);
  }
}
