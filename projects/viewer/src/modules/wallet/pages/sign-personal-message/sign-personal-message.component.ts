import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '@muzika/core';
import {WalletStorageService} from '../../services/wallet-storage.service';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';

@Component({
  selector: 'wallet-sign-personal-message',
  templateUrl: './sign-personal-message.component.html',
  styleUrls: ['./sign-personal-message.component.scss']
})
export class WalletSignPersonalMessageComponent extends BaseComponent {
  currentEvent: any;
  currentMsg: any;

  constructor(private walletStorage: WalletStorageService) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.walletStorage.eventSignMessage.subscribe(e => {
        if (e) {
          this.currentEvent = e.event;
          this.currentMsg = e.msgParams;
          this.currentMsg.data = ethUtil.toBuffer(this.currentMsg.data).toString();
        } else {
          this.currentEvent = null;
          this.currentMsg = null;
        }
      })
    );
  }

  sign() {
    const privateKey = this.walletStorage.privateKeyOf(this.currentMsg.from);
    const serialized = sigUtil.personalSign(privateKey, this.currentMsg);

    this.currentEvent.sender.send('Wallet:signPersonalMessage:received', null, serialized);
    this.walletStorage.emitReadySignMessage(null);
  }
}
