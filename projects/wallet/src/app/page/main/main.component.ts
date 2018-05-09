import {Component, Inject, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseComponent} from '../../../shared/base.component';
import {AddressOnlyProvider, MetamaskProvider, RPCProvider, WalletProvider, Web3, WEB3} from '@muzika/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  showExtra = false;
  extraType: 'keystore' | 'privateKey' | 'direct' = null;
  keystoreFile: File = null;

  @ViewChildren(NgForm)
  forms: QueryList<NgForm>;

  constructor(@Inject(WEB3) private web3: Web3,
              private router: Router) {
    super();
  }

  ngOnInit() {
    console.log(this.web3);
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

  usingAddressDirect(form: NgForm) {
    if (form.value.address) {
      this.web3.setProvider(new AddressOnlyProvider(form.value.address));
      this.router.navigate(['/wallet']);
    }
  }

  displayExtra(_extraType: 'keystore' | 'privateKey' | 'direct') {
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
