import {Component} from '@angular/core';
import {AlertifyInstnace, BaseComponent, MuzikaWeb3Service} from '@muzika/core/angular';

@Component({
  selector: 'wallet-metamask-selector',
  templateUrl: './wallet-metamask.component.html'
})
export class WalletMetamaskComponent extends BaseComponent {
  constructor(private web3Service: MuzikaWeb3Service) {
    super();
  }

  usingMetamask() {
    this.web3Service.usingMetamask().subscribe(
      () => {

      },
      (e) => {
        AlertifyInstnace.alert('메타마스크를 사용할 수 없습니다. 설치가 제대로 되어있는지 확인해주세요.');
      }
    );
  }

}

