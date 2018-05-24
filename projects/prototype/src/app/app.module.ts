import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NgModule, PLATFORM_ID, Inject, Provider} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  BASE_API_URL,
  baseApiUrl,
  baseApiUrlDev,
  baseApiUrlStage,
  MuzikaCoreModule, SharedModule
} from '@muzika/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRouteModule} from './app.routes';
import {ArtistSheetComponent} from './component/artist-sheet/artist-sheet.component';
import {FooterComponent} from './component/footer/footer.component';
import {PostListItemComponent} from './component/post-list-item/post-list-item.component';
import {PostSheetComponent} from './component/post-sheet/post-sheet.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {LoginPageComponent} from './page/login/login.component';
import {MainPageComponent} from './page/main/main.component';
import {WalletPageComponent} from './page/wallet/wallet.component';
import {NavbarComponent} from './component/navbar/navbar.component';

declare const window;

const baseApiUrlProvider: Provider = {
  provide: BASE_API_URL,
  useValue: {
    stage: baseApiUrlStage,
    dev: baseApiUrlDev,
    prod: baseApiUrl
  }[environment.env] || baseApiUrl
};


@NgModule({
  declarations: [
    AppComponent,

    /* Reusable Components */
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    ArtistSheetComponent,
    PostSheetComponent,
    PostListItemComponent,

    /* Page Components */
    WalletPageComponent,
    MainPageComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({appId: 'muzika-universal'}),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    AppRouteModule,
    ModalModule.forRoot(),
    SharedModule,
    MuzikaCoreModule.forRoot(environment.env),
  ],
  bootstrap: [AppComponent],
  providers: [
    baseApiUrlProvider
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
