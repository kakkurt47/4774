import {Provider as Web3Provider, TxData} from '@0xproject/types';
import {Inject, Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as ProviderEngine from 'web3-provider-engine';
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc';
import * as HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet';
import * as FiltersSubprovider from 'web3-provider-engine/subproviders/filters';
import {TabService} from '../services/tab.service';
import {ElectronService} from './electron.service';
import * as deserializeError from 'deserialize-error';

@Injectable()
export class MuzikaWalletProvider implements Web3Provider {
  private engine: ProviderEngine;

  constructor(@Inject('RPC_URL') private rpcUrl: string,
              private electronService: ElectronService,
              private tabService: TabService,
              private zone: NgZone,
              private router: Router) {
    const rpcProvider = new RpcSubprovider({rpcUrl});

    const opts = {
      getAccounts: (cb: (error, ...args) => any) => {
        this.zone.run(() => {
          this.getAccounts(cb);
        });
      },
      signTransaction: (txData: TxData, cb: (error, ...args) => any) => {
        this.zone.run(() => {
          this.tabService.changeTab('floating-wallet');
          this.router.navigate([{outlets: {wallet: 'sign-transaction'}}]);
          this.signTransaction(txData, cb);
        });
      },
      signPersonalMessage: (msgParams: any, cb: (error, ...args) => any) => {
        this.zone.run(() => {
          this.tabService.changeTab('floating-wallet');
          this.router.navigate([{outlets: {wallet: 'sign-message'}}]);
          this.signPersonalMessage(msgParams, cb);
        });
      }
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
    const uuid = this.uuid();
    this.electronService.ipcRenderer.once(this.wrap('Wallet:getAccounts', uuid), (events, error, accounts) => {
      if (error) {
        cb(deserializeError(error));
      } else {
        cb(null, accounts);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:getAccounts', uuid);
  }

  private signTransaction(txData: TxData, cb: (error, ...args) => any): void {
    const uuid = this.uuid();
    this.electronService.ipcRenderer.once(this.wrap('Wallet:signTransaction', uuid), (events, error, signed) => {
      if (error) {
        cb(deserializeError(error));
      } else {
        this.tabService.changeTab('viewer');
        cb(null, signed);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:signTransaction', uuid, txData);
  }

  private signPersonalMessage(msgParams: any, cb: (error, ...args) => any): void {
    const uuid = this.uuid();
    this.electronService.ipcRenderer.once(this.wrap('Wallet:signPersonalMessage', uuid), (events, error, signed) => {
      if (error) {
        cb(deserializeError(error));
      } else {
        this.tabService.changeTab('viewer');
        cb(null, signed);
      }
    });
    this.electronService.ipcRenderer.send('Wallet:signPersonalMessage', uuid, msgParams);
  }

  private uuid(): string {
    const s4 = () => ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  private wrap(eventName: string, uuid?: string) {
    if (!this.uuid) {
      uuid = this.uuid();
    }

    return `${eventName}::${uuid}`;
  }
}
