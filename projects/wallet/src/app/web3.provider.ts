import {InjectionToken, Provider} from '@angular/core';
import {environment} from '../environments/environment';
import * as Web3 from 'web3';

declare var window: any;

let web3Factory = () => {
  let web3: any;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (window !== undefined && typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!');

    // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
    // Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider(`http://${environment.rpc.host}:${environment.rpc.port}`));
  }

  return web3;
};

export const WEB3 = new InjectionToken<Web3>('Web3');

export const Web3Provider: Provider = {
  provide: WEB3,
  useFactory: web3Factory
};
