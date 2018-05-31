import {Provider as Web3Provider, TxData} from '@0xproject/types';
import {ChangeDetectorRef, Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as ProviderEngine from 'web3-provider-engine';
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc';
import * as HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet';
import * as FiltersSubprovider from 'web3-provider-engine/subproviders/filters';
import {TabService} from '../services/tab.service';
import {ElectronService} from './electron.service';

@Injectable()
export class MuzikaWalletProvider implements Web3Provider {
  private engine: ProviderEngine;

  constructor(@Inject('RPC_URL') private rpcUrl: string,
              private electronService: ElectronService,
              private tabService: TabService,
              private router: Router) {
    const rpcProvider = new RpcSubprovider({rpcUrl});

    const opts = {
      getAccounts: this.getAccounts.bind(this),
      signTransaction: this.signTransaction.bind(this),
      signPersonalMessage: this.signPersonalMessage.bind(this)
    };

    this.engine = new ProviderEngine({pollingInterval: 10000});
    this.engine.addProvider(new FiltersSubprovider());
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

  private signTransaction(txData: TxData, cb: (error, ...args) => any): void {
    // this.tabService.changeTab('floating-wallet');
    // this.router.navigate([{outlets: {wallet: 'sign-message'}}]);
    this.electronService.ipcRenderer.once('Wallet:signTransaction', (events, error, signed) => {
      this.tabService.changeTab('viewer');
      if (error) {
        cb(error);
      } else {
        cb(null, signed);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:signTransaction', txData);
  }

  private signPersonalMessage(msgParams: any, cb: (error, ...args) => any): void {
    // @TODO show signing message
    // this.tabService.changeTab('floating-wallet');
    // this.router.navigate([{outlets: {wallet: 'sign-message'}}]);
    this.electronService.ipcRenderer.once('Wallet:signPersonalMessage', (events, error, signed) => {
      this.tabService.changeTab('viewer');
      if (error) {
        cb(error);
      } else {
        cb(null, signed);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:signPersonalMessage', msgParams);
  }
}
