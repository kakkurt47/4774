import {Component, Inject, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LedgerProvider} from '../../../../../core/src/web3-providers/ledger.provider';
import {BaseComponent} from '../../../shared/base.component';
import {AddressOnlyProvider, MetamaskProvider, RPCProvider, WalletProvider, Web3, WEB3} from '@muzika/core';
import {promisify} from '../../../utils';

type ExtraType = null | 'keystore' | 'privateKey' | 'direct' | 'ledger';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  showExtra = false;
  extraType: ExtraType = null;
  keystoreFile: File = null;

  ledgerConnection: 'ready' | 'connecting' | 'error';
  ledgerAccounts: string[] = [];
  ledgerOffset = 0;
  ledgerAccountLength = 5;

  @ViewChildren(NgForm)
  forms: QueryList<NgForm>;

  constructor(@Inject(WEB3) private web3: Web3,
              @Inject('RPC_URL') private rpcUrl: string,
              private router: Router) {
    super();
  }

  ngOnInit() {
    // console.log(this.web3);
  }

  usingMetamask() {
    this.web3.setProvider(new MetamaskProvider());
    this.router.navigate(['/wallet']);
  }

  usingGanache() {
    this.web3.setProvider(new RPCProvider(this.rpcUrl));
    this.router.navigate(['/wallet']);
  }

  usingLedger(offset?: number) {
    console.log(offset);
    this.web3.setProvider(new LedgerProvider({
      accountsLength: 1,
      accountsOffset: offset || 0
    }));
    this.router.navigate(['/wallet']);
  }

  usingKeystore(form: NgForm) {
    if (form.valid) {
     const reader = new FileReader();
     reader.onload = e => {
       const keystore = reader.result;
       const password = form.value.keyPassword;

       this.web3.setProvider(new WalletProvider({input: keystore, password: password}, this.rpcUrl));
       this.router.navigate(['/wallet']);
     };
     reader.readAsText(this.keystoreFile);
    }
  }

  usingPrivateKey(form: NgForm) {
    if (form.value.privKey) {
      this.web3.setProvider(new WalletProvider(form.value.privKey, this.rpcUrl));
      this.router.navigate(['/wallet']);
    }
  }

  usingAddressDirect(form: NgForm) {
    if (form.value.address) {
      this.web3.setProvider(new AddressOnlyProvider(form.value.address, this.rpcUrl));
      this.router.navigate(['/wallet']);
    }
  }

  displayExtra(_extraType: ExtraType) {
    this.extraType = _extraType;
    this.showExtra = true;

    if (_extraType === 'ledger') {
      this.ledgerConnection = 'connecting';
      this.ledgerOffset = 0;
      this.loadLedgerAccounts();
    }
  }

  resetExtra() {
    this.showExtra = false;
    this.keystoreFile = null;
    this.forms.forEach(item => item.reset());
  }

  onKeystoreSelect(event: any) {
    const target = event.target;

    if (target) {
      this.keystoreFile = target.files[0];
    }
  }

  loadLedgerAccounts(offset?: number) {
    delete this.web3.currentProvider;
    offset = offset || 0;

    this.web3.setProvider(new LedgerProvider({
      accountsLength: this.ledgerAccountLength,
      accountsOffset: offset
    }, this.rpcUrl));

    promisify(this.web3.eth.getAccounts).then(accounts => {
      this.ledgerConnection = 'ready';
      this.ledgerAccounts = accounts;
      this.ledgerOffset = offset;
    }).catch(e => {
      console.error(e);
      this.ledgerConnection = 'error';
    });
  }

  ledgerNextAccounts() {
    this.ledgerConnection = 'connecting';
    this.loadLedgerAccounts(this.ledgerOffset + this.ledgerAccountLength);
  }

  ledgerPrevAccounts() {
    this.ledgerConnection = 'connecting';
    this.loadLedgerAccounts(this.ledgerOffset > 0 ? this.ledgerOffset - this.ledgerAccountLength : 0);
  }
}
