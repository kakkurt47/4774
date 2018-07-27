import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MuzikaIntroModule } from '../modules/intro/intro.module';
import { AppComponent } from './app.component';
import { isPlatformBrowser } from '@angular/common';
import { Lang } from '../models/lang';
import { LocalStorage } from '../models/localstorage.service';
import { RouterModule } from '@angular/router';
import * as Raven from 'raven-js';
import { AirdropModule } from '../modules/airdrop/airdrop.module';

Raven
  .config('https://940fec8f8e2e49c796e0e6fbf4fb7259@sentry.io/1250399')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* Angular modules */
    BrowserModule.withServerTransition({ appId: 'muzika-universal' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule,

    /* Muzika Modules */

    MuzikaIntroModule,
    AirdropModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),

    /* Bootstrap modules */
    ModalModule.forRoot(),

    /* Material modules */
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId,
              private localStorage: LocalStorage,
              private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    const currentLang = (isPlatformBrowser(this.platformId)) ?
      this.localStorage.getItem('currentLang', this.translateService.getBrowserLang()) : Lang.ENG;
    switch (currentLang) {
      case Lang.ENG:
      case Lang.KOR:
      case Lang.CHN:
        this.translateService.use(currentLang as string);
        break;
      default:
        this.translateService.use('en');
    }

    this.translateService.onLangChange.subscribe(lang => {
      this.localStorage.setItem('currentLang', this.translateService.currentLang);
    });
  }
}
