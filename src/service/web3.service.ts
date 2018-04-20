import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {environment} from '../environments/environment';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

declare let window: any;

@Injectable()
export class Web3Service {
  MuzikaCoin: any;
  MuzikaPaperContract: any;

  constructor() {
    this.MuzikaCoin = contract(require('../../build/contracts/MuzikaCoin.json'));
    this.MuzikaPaperContract = contract(require('../../build/contracts/MuzikaPaperContract.json'));
  }

  ready(): Observable<any> {
    return new Observable(observer => {
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

      this.MuzikaCoin.setProvider(web3.currentProvider);
      this.MuzikaPaperContract.setProvider(web3.currentProvider);
      observer.next(web3);
      observer.complete();
    });
  }
}
