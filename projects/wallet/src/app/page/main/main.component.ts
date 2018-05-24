import {Component, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseComponent, MuzikaWeb3Service} from '@muzika/core';
import * as _alertify from 'alertify.js';

const alertify = _alertify.okBtn('확인').cancelBtn('취소');

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

  constructor(private web3Service: MuzikaWeb3Service,
              private router: Router) {
    super();
  }

  ngOnInit() {
    // console.log(this.web3);
  }

  usingMetamask() {
    this.web3Service.usingMetamask().subscribe(
      () => {
        this.router.navigate(['/wallet']);
      },
      (e) => {
        alertify.alert('메타마스크를 사용할 수 없습니다. 설치가 제대로 되어있는지 확인해주세요.');
      }
    );
  }

  usingGanache() {
    this.web3Service.usingGanache().subscribe(() => {
      this.router.navigate(['/wallet']);
    });
  }

  usingLedger(offset?: number) {
    this.web3Service.usingLedger(offset).subscribe(() => {
      this.router.navigate(['/wallet']);
    });
  }

  async usingKeystore(form: NgForm) {
    if (form.valid) {
      this.web3Service.usingKeystore(this.keystoreFile, form.value.keyPassword).subscribe(
        () => {
          this.router.navigate(['/wallet']);
        },
        (e) => {
          alertify.alert('올바르지 않은 지갑 파일이거나 비밀번호가 일치하지 않습니다');
        }
      );
    } else {
      alertify.alert('파일을 선택해주시고 비밀번호를 입력해주세요');
    }
  }

  usingPrivateKey(form: NgForm) {
    if (form.valid && form.value.privKey) {
      this.web3Service.usingPrivateKey(form.value.privKey).subscribe(() => {
        this.router.navigate(['/wallet']);
      });
    } else {
      alertify.alert('개인키가 올바르지 않습니다');
    }
  }

  usingAddressDirect(form: NgForm) {
    if (form.valid && form.value.address) {
      this.web3Service.usingAddressDirect(form.value.address).subscribe(() => {
        this.router.navigate(['/wallet']);
      });
    } else {
      alertify.alert('지갑주소가 올바르지 않습니다');
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

  ledgerNextAccounts() {
    this.ledgerConnection = 'connecting';
    this.loadLedgerAccounts(this.ledgerOffset + this.ledgerAccountLength);
  }

  ledgerPrevAccounts() {
    this.ledgerConnection = 'connecting';
    this.loadLedgerAccounts(this.ledgerOffset > 0 ? this.ledgerOffset - this.ledgerAccountLength : 0);
  }

  private loadLedgerAccounts(offset?: number) {
    this.web3Service
      .usingLedger(offset, this.ledgerAccountLength)
      .subscribe(
        accounts => {
          this.ledgerConnection = 'ready';
          this.ledgerAccounts = accounts;
          this.ledgerOffset = offset;
        },
        e => {
          console.error(e);
          this.ledgerConnection = 'error';
        }
      );
  }
}
