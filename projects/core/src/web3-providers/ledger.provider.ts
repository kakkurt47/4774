import * as ProviderEngine from 'web3-provider-engine';
import * as FiltersSubprovider from 'web3-provider-engine/subproviders/filters';
import {default as TransportU2F} from '@ledgerhq/hw-transport-u2f';
import {default as createLedgerSubprovider} from "@ledgerhq/web3-subprovider";
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc';
import {Provider as Web3Provider} from '@0xproject/types';
import * as Wallet from 'ethereumjs-wallet-browser';
import {Buffer} from 'safe-buffer';
import {DEFAULT_RPC_URL} from '../config';

type SubproviderOptions = {
  // refer to https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
  networkId?: number,
  // derivation path
  path?: string,
  // should use actively validate on the device
  askConfirm?: boolean,
  // number of accounts to derivate
  accountsLength?: number,
  // offset index to use to start derivating the accounts
  accountsOffset?: number
};

export class LedgerProvider implements Web3Provider {
  private engine: ProviderEngine;

  constructor(opts?: SubproviderOptions,
              providerUrl?: string) {
    opts = Object.assign({
      accountsLength: 5
    }, opts);

    const getTransport = () => TransportU2F.create();

    const ledger = createLedgerSubprovider(getTransport, opts);

    const rpcProvider = new RpcSubprovider({
      rpcUrl: providerUrl || DEFAULT_RPC_URL
    });

    this.engine = new ProviderEngine({pollingInterval: 10000});
    this.engine.addProvider(ledger);
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
}
