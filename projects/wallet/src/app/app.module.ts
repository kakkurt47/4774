import {CommonModule} from '@angular/common';
import {NgModule, PLATFORM_ID, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MuzikaCoreModule, MuzikaCommonModule, PLATFORM_TYPE_TOKEN} from '@muzika/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRouteModule} from './app.routes';
import {NavbarComponent} from './component/navbar/navbar.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {MainPageComponent} from './page/main/main.component';
import {WalletPageComponent} from './page/wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletPageComponent,
    MainPageComponent,
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({appId: 'muzika-universal'}),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouteModule,
    ModalModule.forRoot(),
    MuzikaCommonModule,
    MuzikaCoreModule.forRoot(environment.env),
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: PLATFORM_TYPE_TOKEN,
    useValue: 'wallet'
  }]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
  }
}
