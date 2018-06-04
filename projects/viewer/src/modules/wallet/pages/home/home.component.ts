import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as ethUtil from 'ethereumjs-util';
import * as ethWallet from 'ethereumjs-wallet';
import * as EthTx from 'ethereumjs-tx';
import * as sigUtil from 'eth-sig-util';
import * as serializeError from 'serialize-error';
import {ElectronService} from '../../../../app/providers/electron.service';
import {WalletStorageService} from '../../services/wallet-storage.service';

@Component({
  selector: 'wallet-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class WalletHomeComponent implements OnInit, OnDestroy {
  accounts: string[] = [];
  listeners: any[] = [];

  constructor(private walletStorage: WalletStorageService,
              private electronService: ElectronService,
              private zone: NgZone) {
  }

  ngOnInit() {
    const getAccountsListener = (event, uuid) => {
      this.zone.run(() => {
        event.sender.send('WalletProvider:getAccounts', uuid, null, this.walletStorage.accounts);
      });
    };

    this.listeners.push(getAccountsListener);

    const signTransactionListener = (event, uuid, txData) => {
      this.zone.run(() => {
        if (this.walletStorage.hasPrivateKeyOf(txData.from)) {
          this.walletStorage.emitSignTransactionEvent({event, uuid, data: txData});
        } else {
          event.sender.send(
            'WalletProvider:signTransaction',
            uuid,
            serializeError(
              new Error(`Unknown address - unable to sign transaction for this address: "${txData.from}"`)
            )
          );
        }
      });
    };

    this.listeners.push(signTransactionListener);

    const signPersonalMessageListener = (event, uuid, msgParams) => {
      this.zone.run(() => {
        if (this.walletStorage.hasPrivateKeyOf(msgParams.from)) {
          this.walletStorage.emitSignMessageEvent({event, uuid, data: msgParams});
        } else {
          event.sender.send(
            'WalletProvider:signPersonalMessage',
            uuid,
            serializeError(
              new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`)
            )
          );
        }
      });
    };

    this.listeners.push(signPersonalMessageListener);

    this.electronService.ipcRenderer.on('WalletProvider:getAccounts', getAccountsListener);
    this.electronService.ipcRenderer.on('WalletProvider:signTransaction', signTransactionListener);
    this.electronService.ipcRenderer.on('WalletProvider:signPersonalMessage', signPersonalMessageListener);
  }

  ngOnDestroy() {
    this.electronService.ipcRenderer.removeAllListeners('WalletProvider:getAccounts');
    this.electronService.ipcRenderer.removeAllListeners('WalletProvider:signTransaction');
    this.electronService.ipcRenderer.removeAllListeners('WalletProvider:signPersonalMessage');
  }
}
