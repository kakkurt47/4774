import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertifyInstnace} from '@muzika/core';
import {BaseComponent, MuzikaWeb3Service} from '@muzika/core/angular';

@Component({
  selector: 'wallet-keystore-selector',
  templateUrl: './wallet-keystore.component.html'
})
export class WalletKeystoreComponent extends BaseComponent {
  keystoreFile: File = null;

  constructor(private web3Service: MuzikaWeb3Service) {
    super();
  }

  onKeystoreSelect(event: any) {
    const target = event.target;

    if (target) {
      this.keystoreFile = target.files[0];
    }
  }

  usingKeystore(form: NgForm) {
    if (form.valid) {
      this.web3Service.usingKeystore(this.keystoreFile, form.value.keyPassword).subscribe(
        () => {

        },
        (e) => {
          AlertifyInstnace.alert('올바르지 않은 지갑 파일이거나 비밀번호가 일치하지 않습니다');
        }
      );
    } else {
      AlertifyInstnace.alert('파일을 선택해주시고 비밀번호를 입력해주세요');
    }
  }
}

