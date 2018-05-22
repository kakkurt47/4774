import {Injectable, Inject} from '@angular/core';
import {EnvironmentToken, EnvironmentType} from './environments/env_types';
import {promisify} from './utils';
import {AddressOnlyProvider, LedgerProvider, MetamaskProvider, RPCProvider, WalletProvider} from './web3-providers';
import {ExtendedWeb3} from './web3.provider';

@Injectable()
export class MuzikaWeb3Service {
  constructor(private web3: ExtendedWeb3,
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

  public getTransactions() {
    const subj = new BehaviorSubject<any[]>([]);

    /** @TODO
     * @assign brcps12
     * @implements use etherscan.io public api or use our internal ethereum node
     * Get Transaction list & return all of the transactions as array
     */

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
