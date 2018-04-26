import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ContractProviders} from '../contracts';

import { AppComponent } from './app.component';
import {AppRouteModule} from './app.routes';
import {TestPageComponent} from './page/test/test.component';
import {WalletPageComponent} from './page/wallet/wallet.component';
import {Web3Provider} from './web3.provider';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    WalletPageComponent
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
export class AppModule { }
