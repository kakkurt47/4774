import {Injectable, Inject} from '@angular/core';
import {Web3} from './types/web3';
import {promisify} from './utils';
import {AddressOnlyProvider} from './web3-providers/address.only.provider';
import {LedgerProvider} from './web3-providers/ledger.provider';
import {MetamaskProvider} from './web3-providers/metamask.provider';
import {RPCProvider} from './web3-providers/rpc.provider';
import {WalletProvider} from './web3-providers/wallet.provider';
import {WEB3_TOKEN} from './web3.provider';
import {EnvironmentToken, EnvironmentType} from './types/environment';

@Injectable()
export class MuzikaWeb3Service {
  constructor(@Inject(WEB3_TOKEN) private web3: Web3,
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
