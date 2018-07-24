import {Component} from '@angular/core';
import {BaseComponent, MuzikaWeb3Service} from '@muzika/core/angular';

@Component({
  selector: 'wallet-ledger-selector',
  templateUrl: './wallet-ledger.component.html'
})
export class WalletLedgerComponent extends BaseComponent {

  ledgerConnection: 'ready' | 'connecting' | 'error';
  ledgerAccounts: string[] = [];
  ledgerOffset = 0;
  ledgerAccountLength = 5;

  constructor(private web3Service: MuzikaWeb3Service) {
    super();
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
