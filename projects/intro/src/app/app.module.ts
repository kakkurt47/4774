import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
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
import { MuzikaIconComponent } from '../muzika-icon/muzika-icon.component';
import { RouterModule } from '@angular/router';

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
  providers: [],
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
