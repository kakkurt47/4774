import {environment} from '../environments/environment';
import * as Web3 from 'web3';
import {Provider as Web3Provider} from '@0xproject/types';

export class RPCProvider implements Web3Provider {
  private _provider: Web3Provider;

  constructor(host?: string) {
    if (!host) {
      host = `http://${environment.rpc.host}:${environment.rpc.port}`;
    }

    this._provider = new Web3.providers.HttpProvider(host);
  }

  send(...args): any {
    return (<any>this._provider).send.apply(this._provider, args);
  }

  sendAsync(...args): void {
    this._provider.sendAsync.apply(this._provider, args);
  }
}
