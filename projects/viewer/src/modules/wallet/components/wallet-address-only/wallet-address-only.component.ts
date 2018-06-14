import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseComponent, MuzikaWeb3Service} from '@muzika/core/angular';
import {AlertifyInstnace} from '@muzika/core';

@Component({
  selector: 'wallet-address-only-selector',
  templateUrl: './wallet-address-only.component.html'
})
export class WalletAddressOnlyComponent extends BaseComponent {
  constructor(private web3Service: MuzikaWeb3Service) {
    super();
  }

  usingAddressDirect(form: NgForm) {
    if (form.valid && form.value.address) {
      this.web3Service.usingAddressDirect(form.value.address).subscribe(() => {
      });
    } else {
      AlertifyInstnace.alert('지갑주소가 올바르지 않습니다');
    }
  }

}
