import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@muzika/core';
import {Observable} from 'rxjs/internal/Observable';
import * as ethUtil from 'ethereumjs-util';
import {ElectronService} from '../../../../app/providers/electron.service';

@Component({
  selector: 'wallet-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class WalletHomeComponent implements OnInit {
  accountsObs: Observable<string[]>;
  accounts: string[] = [];

  constructor(private localStorage: LocalStorage,
              private electronService: ElectronService) {

    // @TODO save another way (currently use mock)
    const privateKeysMock = [
      '0x15a62a6a313c48a469c7a19a10314185e20348468b498c29bc56e8e2db515fb3',
      '0x334024680a5a8be414a9530d644b355f07e82edce512540d59316c423754a697',
      '0x5e9b2e2824afd50a41080ad9a8353d075ce3ac566a56caf5f5bdb1f011bb6bd2',
      '0x8fc7f4f38d1f03004ae44cd01ca92b24be82058c8351194a352f3a459fa5eece',
      '0x98defabd4de4253079e6eee2cfae69897074efcfb74d828950f3338c2c359735'
    ];

    this.localStorage.setItem('wallets', JSON.stringify(privateKeysMock));
  }

  ngOnInit() {
    const privateKeys: string[] = JSON.parse(this.localStorage.getItem('wallets'));

    this.accounts = privateKeys.map(key => {
      const address = ethUtil.privateToAddress(ethUtil.toBuffer(key));

      return ethUtil.toChecksumAddress(ethUtil.bufferToHex(address));
    });

    // @TODO refactor
    this.electronService.ipcRenderer.on('Wallet:getAccounts:request', (event) => {
      event.sender.send('Wallet:getAccounts:received', null, this.accounts);
    });

    this.electronService.ipcRenderer.on('Wallet:signTransaction:request', (event) => {
      // @TODO Implement
      event.sender.send('Wallet:signTransaction:received', new Error('Not implemented'));
    });

    this.electronService.ipcRenderer.on('Wallet:signPersonalMessage:request', (event) => {
      // @TODO Implement
      event.sender.send('Wallet:signPersonalMessage:received', new Error('Not implemented'));
    });
  }
}
