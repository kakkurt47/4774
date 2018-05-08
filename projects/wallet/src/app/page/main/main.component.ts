import {Component, Inject, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MetamaskProvider} from '../../../web3-providers/metamask.provider';
import {RPCProvider} from '../../../web3-providers/rpc.provider';
import {WalletProvider} from '../../../web3-providers/wallet.provider';
import {WEB3} from '../../web3.provider';
import {BaseComponent} from '../../../shared/base.component';
import {Web3} from '../../../typings/web3';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  showExtra = false;
  extraType: 'keystore' | 'privateKey' = null;
  keystoreFile: File = null;

  @ViewChildren(NgForm)
  forms: QueryList<NgForm>;

  constructor(@Inject(WEB3) private web3: Web3,
              private router: Router) {
    super();
  }

  ngOnInit() {
  }

  usingMetamask() {
    this.web3.setProvider(new MetamaskProvider());
    this.router.navigate(['/wallet']);
  }

  usingGanache() {
    this.web3.setProvider(new RPCProvider());
    this.router.navigate(['/wallet']);
  }

  usingKeystore(form: NgForm) {
    if (form.valid) {
     const reader = new FileReader();
     reader.onload = e => {
       const keystore = reader.result;
       const password = form.value.keyPassword;

       this.web3.setProvider(new WalletProvider({input: keystore, password: password}));
       this.router.navigate(['/wallet']);
     };
     reader.readAsText(this.keystoreFile);
    }
  }

  usingPrivateKey(form: NgForm) {
    if (form.value.privKey) {
      this.web3.setProvider(new WalletProvider(form.value.privKey));
      this.router.navigate(['/wallet']);
    }
  }

  displayExtra(_extraType: 'keystore' | 'privateKey') {
    this.extraType = _extraType;
    this.showExtra = true;
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
}
