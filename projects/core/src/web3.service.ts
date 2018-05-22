import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EnvironmentToken, EnvironmentType} from './environments/env_types';
import {promisify} from './utils';
import {AddressOnlyProvider, LedgerProvider, MetamaskProvider, RPCProvider, WalletProvider} from './web3-providers';
import {ExtendedWeb3} from './web3.provider';
import {MuzikaCoin} from './contracts';

@Injectable()
export class MuzikaWeb3Service {
  constructor(private web3: ExtendedWeb3,
              private muzikaCoin: MuzikaCoin,
              @Inject(EnvironmentToken) private environment: EnvironmentType,
              @Inject('RPC_URL') private rpcUrl: string) {
  }

  public usingMetamask() {
    this.web3.setProvider(new MetamaskProvider());
  }

  public usingGanache() {
    this.web3.setProvider(new RPCProvider(this.rpcUrl));
  }

  public usingLedger(offset?: number) {
    this.web3.setProvider(new LedgerProvider({
      accountsLength: 1,
      accountsOffset: offset || 0,
      networkId: this.environment.networkId,
    }, this.rpcUrl));
  }

  public usingKeystore(file: File, password: string) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const keystore = reader.result;
        let provider;

        try {
          provider = new WalletProvider({
            input: keystore, password
          }, this.rpcUrl);
          this.web3.setProvider(provider);
          resolve();
        } catch (e) {
          reject();
        }
      };
      reader.readAsText(file);
    });
  }

  public usingPrivateKey(privateKey: string) {
    this.web3.setProvider(new WalletProvider(privateKey, this.rpcUrl));
  }

  public usingAddressDirect(address: string) {
    this.web3.setProvider(new AddressOnlyProvider(address, this.rpcUrl));
  }

  public getTransactions(address: string): Observable<any[]> {
    const subj = new BehaviorSubject<any[]>([]);
    const transferHash = this.web3.sha3('Transfer(address,address,uint256)');

    // Padding zeros to left (length of data set to 32 bytes)
    address = '0x' + (<any>this.web3).padLeft(address.replace('0x', ''), 64);
    const filter = this.web3.eth.filter({
      // @TODO fromBlock must be the number of block at which MuzikaCoin is created
      fromBlock: 0,
      toBlock: 'latest',
      address: this.muzikaCoin.address,
      // Transfer `address` to another
      topics: [transferHash, address]
      // Receive Tokens Events
      // topics: [transferHash, null, address]
    });

    (<any>filter).get((error: any, events: any) => {
      if (error) {

      }

      // the order is ascend of block number
      subj.next(events.map(event => {
        return {
          from: event.topics[1],
          to: event.topics[2],
          amount: this.web3.toBigNumber(event.data).toString()
        };
      }));
    });

    return subj.asObservable();
  }

  public loadLedgerAccounts(accountsOffset?: number, accountsLength: number = 5) {
    delete this.web3.currentProvider;
    accountsOffset = accountsOffset || 0;

    this.web3.setProvider(new LedgerProvider({
      accountsLength, accountsOffset,
      networkId: this.environment.networkId,
    }, this.rpcUrl));

    return promisify(this.web3.eth.getAccounts);
  }
}
