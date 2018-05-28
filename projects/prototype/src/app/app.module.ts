import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NgModule, PLATFORM_ID, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MuzikaCoreModule, SharedModule} from '@muzika/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {environment} from '../environments/environment';
import {PostModule} from '../modules/post/post.module';

import {AppComponent} from './app.component';
import {AppRouteModule} from './app.routes';
import {ArtistSheetComponent} from './component/artist-sheet/artist-sheet.component';
import {FooterComponent} from './component/footer/footer.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {LoginPageComponent} from './page/login/login.component';
import {MainPageComponent} from './page/main/main.component';
import {WalletPageComponent} from './page/wallet/wallet.component';
import {PLATFORM_TYPE_TOKEN} from '../../../core/src/models/platform';

declare const window;


@NgModule({
  declarations: [
    AppComponent,

    /* Reusable Components */
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    ArtistSheetComponent,

    /* Page Components */
    WalletPageComponent,
    MainPageComponent,
    LoginPageComponent,
  ],
  imports: [
    /* Angular modules */
    CommonModule,
    BrowserModule.withServerTransition({appId: 'muzika-universal'}),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    /* Bootstrap modules */
    ModalModule.forRoot(),

    /* Material modules */
    MatButtonModule,
    MatCardModule,

    /* Muzika Modules */
    SharedModule,
    MuzikaCoreModule.forRoot(environment.env),
    AppRouteModule,

    /* Sub-modules */
    PostModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: PLATFORM_TYPE_TOKEN,
      useValue: 'electron'
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
