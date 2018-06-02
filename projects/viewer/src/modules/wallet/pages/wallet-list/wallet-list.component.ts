import {Component, NgZone} from '@angular/core';
import {BaseComponent, promisify, toBigNumber, unitDown, unitUp, IMuzikaCoin, createTruffleMuzikaCoin} from '@muzika/core';
import * as ethUtil from 'ethereumjs-util';
import * as ethWallet from 'ethereumjs-wallet';
import {ElectronService} from '../../../../app/providers/electron.service';
import {AlertService} from '../../../alert/alert.service';
import {WalletStorageService} from '../../services/wallet-storage.service';
import {Web3WalletProvider} from '../../wallet.provider';

@Component({
  selector: 'wallet-list-page',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
  providers: [Web3WalletProvider]
})
export class WalletListComponent extends BaseComponent {
  accounts: {
    address: string,
    eth: string,
    mzk: string
  }[] = [];
  selectedAccount: string;
  tx: {
    to: string;
    value: string | number;
    gas: string | number;
    gasPrice: string | number;
  };
  web3: any;

  sentTxHash: string;
  private coin: IMuzikaCoin;
  private _submitted = false;

  constructor(private walletStorage: WalletStorageService,
              private walletProvider: Web3WalletProvider,
              private alertService: AlertService,
              private zone: NgZone,
              private electronService: ElectronService) {
    super();
    walletProvider.create(block => {
      zone.run(() => {
        this.loadBalances();
      });
    });

    const MuzikaCoin = createTruffleMuzikaCoin();
    MuzikaCoin.setProvider(walletProvider);
    MuzikaCoin.deployed().then(deployed => {
      this.coin = deployed;
      this.loadBalances();
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this._sub.push(
      this.walletStorage.walletsObs.subscribe(privateKeys => {
        this.accounts = privateKeys.map(key => {
          const address = ethUtil.privateToAddress(ethUtil.toBuffer(key));

          return {
            address: ethUtil.toChecksumAddress(ethUtil.bufferToHex(address)),
            eth: null,
            mzk: null
          };
        });

        this.loadBalances();
      })
    );

    this.tx = {
      to: '',
      gas: '',
      value: '',
      gasPrice: ''
    };
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.walletProvider.stop();
  }

  createWallet(): void {
    const wallet = ethWallet.generate();
    this.walletStorage.addWallet(ethUtil.bufferToHex(wallet.getPrivateKey()));
  }

  sendMZK() {
    const tx = this.tx;
    if (this._submitted) {
      this.alertService.alert('Already submitted. Please wait for a second');
      return;
    }

    if (!tx.to || !tx.value) {
      this.alertService.alert('Please fill `To` and `Amount`');
      return;
    }

    this.alertService.confirm(
      'Are you sure to transfer? Please make sure that you provided information is correct.',
      async () => {
        this._submitted = true;
        try {
          const gasPrice = unitDown(tx.gasPrice, 9); // gwei: 9
          const mzk = unitDown(tx.value);
          this.sentTxHash = await this.coin.transfer.sendTransaction(tx.to, mzk, {
            from: this.selectedAccount,
            gas: tx.gas,
            gasPrice: gasPrice
          });
          this.tx = {
            to: '',
            gas: '',
            value: '',
            gasPrice: ''
          };
        } catch (e) {
          this.alertService.alert('Out of gas or your Muzika is not enough to transfer');
          console.error(e);
        } finally {
          this._submitted = false;
        }
      }
    );
  }

  selectAccount(address: string) {
    this.walletProvider.changeAddress(address);
    this.selectedAccount = address;
  }

  async loadBalances() {
    if (this.coin) {
      this.accounts.forEach(async (account, index) => {
        this.accounts[index].eth = unitUp(await this.ethBalanceOf(account.address));
        this.accounts[index].mzk = unitUp(await this.coin.balanceOf(account.address));
      });
    }
  }

  estimate() {
    if (this.tx.to && this.tx.value) {
      this._estimateGas(this.tx, true);
    }
  }

  ethBalanceOf(address: string): Promise<string> {
    const params = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [address, 'latest']
    };

    return promisify(this.walletProvider.sendAsync.bind(this.walletProvider), params).then(v => {
      return toBigNumber(v.result).toString(10);
    });
  }

  goScan(txHash: string) {
    this.electronService.shell.openExternal(`https://ropsten.etherscan.io/tx/${txHash}`);
  }

  importWallet() {
    // @TODO Now only for private key
    this.alertService.prompt('Enter the wallet private key', (key) => {
      this.walletStorage.addWallet(key);
    });
  }

  private _estimateGas(tx: any, set?: boolean): Promise<number> {
    return this.coin.transfer.estimateGas(tx.to, unitDown(tx.value)).then(estimated => {
      if (set) {
        this.tx.gas = estimated;
      }
      return estimated;
    });
  }
}
