import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material';
import {WalletAddressOnlyComponent} from './components/wallet-address-only/wallet-address-only.component';
import {WalletKeystoreComponent} from './components/wallet-keystore/wallet-keystore.component';
import {WalletLedgerComponent} from './components/wallet-ledger/wallet-ledger.component';
import {WalletMetamaskComponent} from './components/wallet-metamask/wallet-metamask.component';
import {WalletPrivateKeyComponent} from './components/wallet-private-key/wallet-private-key.component';
import {LoginPageComponent} from './pages/login/login.component';
import {WalletRoutesModule} from './wallet.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    WalletRoutesModule
  ],
  declarations: [
    LoginPageComponent,

    WalletPrivateKeyComponent,
    WalletKeystoreComponent,
    WalletAddressOnlyComponent,
    WalletLedgerComponent,
    WalletMetamaskComponent
  ]
})
export class WalletModule {
}
