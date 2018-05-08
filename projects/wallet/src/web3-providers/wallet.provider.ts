import * as ProviderEngine from 'web3-provider-engine';
import * as FiltersSubprovider from 'web3-provider-engine/subproviders/filters.js';
import * as WalletSubprovider from 'web3-provider-engine/subproviders/wallet.js';
import * as ProviderSubprovider from 'web3-provider-engine/subproviders/provider.js';
import * as Web3 from 'web3';
import {Provider as Web3Provider} from '@0xproject/types';
import * as Wallet from 'ethereumjs-wallet-browser';
import {environment} from '../environments/environment';
import {Buffer} from 'safe-buffer';

export class WalletProvider implements Web3Provider {
  private address: string;
  private engine: ProviderEngine;
  private wallet: Wallet;

  constructor(walletKey: string | {input: string, password: string},
              providerOrUrl?: string | Web3Provider,
              timeout?: number,
              user?: string,
              password?: string) {
    if (typeof walletKey === 'string') {
      this.wallet = Wallet.fromPrivateKey(Buffer.from(walletKey, 'hex'));
    } else {
      this.wallet = Wallet.fromV3(walletKey.input, walletKey.password, true);
    }
    this.address = this.wallet.getAddress();

    const httpProvider = (providerOrUrl && providerOrUrl.hasOwnProperty('send') && providerOrUrl.hasOwnProperty('sendAsync'))
      ? providerOrUrl
      : new Web3.providers.HttpProvider(providerOrUrl || `http://${environment.rpc.host}:${environment.rpc.port}`, timeout, user, password);

    this.engine = new ProviderEngine();
    this.engine.addProvider(new WalletSubprovider(this.wallet, {}));
    this.engine.addProvider(new FiltersSubprovider());
    this.engine.addProvider(new ProviderSubprovider(httpProvider));
    this.engine.start(); // Required by the provider engine.
  }

  sendAsync(...args) {
    this.engine.sendAsync.apply(this.engine, args);
  }

  send(...args): any {
    return this.engine.send.apply(this.engine, args);
  }

  getAddress() {
    return this.address;
  }
}
