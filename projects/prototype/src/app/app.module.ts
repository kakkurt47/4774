import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NgModule, PLATFORM_ID, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MuzikaCoreModule} from '@muzika/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRouteModule} from './app.routes';
import {JsonIconComponent} from './component/json-icon/json-icon.component';
import {LedgerIconComponent} from './component/ledger-icon/ledger-icon.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {TrezorIconComponent} from './component/trezor-icon/trezor-icon.component';
import {MainPageComponent} from './page/main/main.component';
import {TestPageComponent} from './page/test/test.component';
import {WalletPageComponent} from './page/wallet/wallet.component';
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
    JsonIconComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouteModule,
    ModalModule.forRoot(),
    MuzikaCoreModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'RPC_URL',
      useValue: `${environment.rpcUrl}/${environment.infuraAccessToken}`
    }
  ]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(this.platformId)) {
      // (window as any).Buffer = Buffer;
      // (window as any).global = window;
    }
  }
}
