import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material';
import {MuzikaCoreModule} from '@muzika/core';
import {WalletAddressOnlyComponent} from './components/wallet-address-only/wallet-address-only.component';
import {WalletKeystoreComponent} from './components/wallet-keystore/wallet-keystore.component';
import {WalletLedgerComponent} from './components/wallet-ledger/wallet-ledger.component';
import {WalletMetamaskComponent} from './components/wallet-metamask/wallet-metamask.component';
import {WalletPrivateKeyComponent} from './components/wallet-private-key/wallet-private-key.component';
import {WalletHomeComponent} from './pages/home/home.component';
import {WalletSignPersonalMessageComponent} from './pages/sign-personal-message/sign-personal-message.component';
import {WalletSignTransactionComponent} from './pages/sign-transaction/sign-transaction.component';
import {WalletListComponent} from './pages/wallet-list/wallet-list.component';
import {HexToNumberPipe} from './pipes/hexToNumber.pipe';
import {WalletStorageService} from './services/wallet-storage.service';
import {WalletRoutesModule} from './wallet.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    WalletRoutesModule,
    MuzikaCoreModule,
  ],
  declarations: [
    WalletHomeComponent,
    WalletPrivateKeyComponent,
    WalletKeystoreComponent,
    WalletAddressOnlyComponent,
    WalletLedgerComponent,
    WalletMetamaskComponent,
    WalletListComponent,
    WalletSignPersonalMessageComponent,
    WalletSignTransactionComponent,
    HexToNumberPipe,
  ],
  providers: [
    WalletStorageService
  ]
})
export class WalletModule {
}
