import {Component, NgZone, OnInit} from '@angular/core';
import * as ethUtil from 'ethereumjs-util';
import * as ethWallet from 'ethereumjs-wallet';
import * as EthTx from 'ethereumjs-tx';
import * as sigUtil from 'eth-sig-util';
import {ElectronService} from '../../../../app/providers/electron.service';
import {WalletStorageService} from '../../services/wallet-storage.service';

@Component({
  selector: 'wallet-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class WalletHomeComponent implements OnInit {
  accounts: string[] = [];

  constructor(private walletStorage: WalletStorageService,
              private electronService: ElectronService,
              private zone: NgZone) {
  }

  ngOnInit() {
    // @TODO refactor
    this.electronService.ipcRenderer.on('Wallet:getAccounts:request', (event) => {
      this.zone.run(() => {
        event.sender.send('Wallet:getAccounts:received', null, this.walletStorage.accounts);
      });
    });

    // @TODO Signing is currently not allowed duplicated
    let signMessageCnt = 0;
    let signTransactionCnt = 0;
    this.electronService.ipcRenderer.on('Wallet:signTransaction:request', (event, txData) => {
      this.zone.run(() => {
        try {
          if (txData.gas !== undefined) {
            txData.gasLimit = txData.gas;
          }
          txData.value = txData.value || '0x00';
          txData.data = ethUtil.addHexPrefix(txData.data);

          const privateKey = this.walletStorage.privateKeyOf(txData.from);

          const tx = new EthTx(txData);
          tx.sign(privateKey);

          console.log('tx', txData);
          // event.sender.send('Wallet:signTransaction:received', null, '0x' + tx.serialize().toString('hex'));
          this.walletStorage.emitReadySignTransaction({event, txData});
        } catch(e) {
          event.sender.send('Wallet:signTransaction:received', e);
        }
      });
    });

    this.electronService.ipcRenderer.on('Wallet:signPersonalMessage:request', (event, msgParams) => {
      this.zone.run(() => {
        try {
          const privateKey = this.walletStorage.privateKeyOf(msgParams.from);
          const serialized = sigUtil.personalSign(privateKey, msgParams);
          // event.sender.send('Wallet:signPersonalMessage:received', null, serialized);
          this.walletStorage.emitReadySignMessage({event, msgParams});
        } catch(e) {
          event.sender.send('Wallet:signPersonalMessage:received', e);
        }
      });
    });
  }

  createWallet(): void {
    const wallet = ethWallet.generate();
    this.walletStorage.addWallet(ethUtil.bufferToHex(wallet.getPrivateKey()));
  }
}
