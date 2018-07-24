import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import {UUIDEvent, WalletStorageService} from '../../services/wallet-storage.service';

@Component({
  selector: 'wallet-sign-personal-message',
  templateUrl: './sign-personal-message.component.html',
  styleUrls: ['./sign-personal-message.component.scss']
})
export class WalletSignPersonalMessageComponent extends BaseComponent {
  currentEvent: UUIDEvent;
  currentMsg: any;
  parsedCurrentMsg: string;

  constructor(private walletStorage: WalletStorageService) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.walletStorage.eventSignMessage.subscribe(event => {
        if (event) {
          this.currentEvent = event;
          this.currentMsg = event.data;
          this.parsedCurrentMsg = ethUtil.toBuffer(this.currentMsg.data).toString();
        } else {
          this.currentEvent = null;
          this.currentMsg = null;
        }
      })
    );
  }

  sign() {
    try {
      const privateKey = this.walletStorage.privateKeyOf(this.currentMsg.from);
      const serialized = sigUtil.personalSign(privateKey, this.currentMsg);

      this.walletStorage.receiveSignMessageEvent(Object.assign(this.currentEvent, {data: serialized}));
    } catch (e) {
      this.walletStorage.receiveSignMessageEvent(Object.assign(this.currentEvent, {error: e}));
    }
  }

  reject() {
    this.walletStorage.receiveSignMessageEvent(
      Object.assign(this.currentEvent, {error: new Error('Rejected Request')})
    );
  }
}
