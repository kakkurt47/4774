import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NgModule, PLATFORM_ID, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ContractProviders} from '../contracts';

import {AppComponent} from './app.component';
import {AppRouteModule} from './app.routes';
import {MainPageComponent} from './page/main/main.component';
import {TestPageComponent} from './page/test/test.component';
import {WalletPageComponent} from './page/wallet/wallet.component';
import {Web3Provider} from './web3.provider';
import {Buffer} from 'safe-buffer';
import {RouterModule} from '@angular/router';

declare const window;

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    WalletPageComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouteModule,
    ModalModule.forRoot()
  ],
  providers: [
    Web3Provider,
    ...ContractProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).Buffer = Buffer;
      (window as any).global = window;
    }
  }
}
