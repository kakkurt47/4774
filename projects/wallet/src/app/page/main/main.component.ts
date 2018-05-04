import {Component, Inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Web3} from '../../../typings/web3';
import {MetamaskProvider} from '../../../web3-providers/metamask.provider';
import {RPCProvider} from '../../../web3-providers/rpc.provider';
import {WalletProvider} from '../../../web3-providers/wallet.provider';
import {WEB3} from '../../web3.provider';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent {
  constructor(@Inject(WEB3) private web3: Web3,
              private router: Router) {
  }

  usingMetamask() {
    this.web3.setProvider(MetamaskProvider());
    this.router.navigate(['/wallet']);
  }

  usingGanache() {
    this.web3.setProvider(RPCProvider());
    this.router.navigate(['/wallet']);
  }

  usingWallet(form: NgForm) {
    if (form.value.privKey) {
      this.web3.setProvider(new WalletProvider(form.value.privKey));
      this.router.navigate(['/wallet']);
    }
  }
}
