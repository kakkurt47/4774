import {Provider as Web3Provider, TxData} from '@0xproject/types';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import * as ProviderEngine from 'web3-provider-engine';
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc';
import * as HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet';
import {ElectronService} from '../providers/electron.service';

@Injectable()
export class MuzikaWalletProvider implements Web3Provider {
  private engine: ProviderEngine;

  constructor(@Inject('RPC_URL') private rpcUrl: string,
              private electronService: ElectronService) {
    const rpcProvider = new RpcSubprovider({rpcUrl});

    const opts = {
      getAccounts: this.getAccounts,
      signTransaction: this.signTransaction,
      signPersonalMessage: this.signPersonalMessage
    };

    this.engine = new ProviderEngine({pollingInterval: 10000});
    this.engine.addProvider(new HookedWalletSubprovider(opts));
    this.engine.addProvider(rpcProvider);
    this.engine.start(); // Required by the provider engine.
  }

  sendAsync(...args) {
    this.engine.sendAsync.apply(this.engine, args);
  }

  send(...args): any {
    return this.engine.send.apply(this.engine, args);
  }

  stop(): void {
    this.engine.stop();
  }

  private getAccounts(cb: (error, ...args) => any): void {
    this.electronService.ipcRenderer.once('Wallet:getAccounts', (events, error, accounts) => {
      if (error) {
        cb(error);
      } else {
        cb(null, accounts);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:getAccounts');
  }

  private signTransaction(txParams: TxData, cb: (error, ...args) => any): void {
    this.electronService.ipcRenderer.once('Wallet:signTransaction', (events, error, signed) => {
      if (error) {
        cb(error);
      } else {
        cb(null, signed);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:signTransaction');
  }

  private signPersonalMessage(msgParams: any, cb: (error, ...args) => any): void {
    this.electronService.ipcRenderer.once('Wallet:signPersonalMessage', (events, error, signed) => {
      if (error) {
        cb(error);
      } else {
        cb(null, signed);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:signPersonalMessage');
  }
}
