import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NgModule, PLATFORM_ID, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ContractProviders} from '../contracts';

import {AppComponent} from './app.component';
import {AppRouteModule} from './app.routes';
import {JsonIconComponent} from './component/json-icon/json-icon.component';
import {LedgerIconComponent} from './component/ledger-icon/ledger-icon.component';
import {TrezorIconComponent} from './component/trezor-icon/trezor-icon.component';
import {MainPageComponent} from './page/main/main.component';
import {TestPageComponent} from './page/test/test.component';
import {WalletPageComponent} from './page/wallet/wallet.component';
import {LocalWeb3Provider} from './web3.provider';
import {NavbarComponent} from './component/navbar/navbar.component';

declare const window;

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    WalletPageComponent,
    MainPageComponent,
    NavbarComponent,
    LedgerIconComponent,
    TrezorIconComponent,
    JsonIconComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouteModule,
    ModalModule.forRoot()
  ],
  providers: [
    LocalWeb3Provider,
    ...ContractProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(this.platformId)) {
      // (window as any).Buffer = Buffer;
      // (window as any).global = window;
    }
  }
}
