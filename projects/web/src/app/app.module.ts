import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentTypeToken, LocalStorage, MuzikaCommonModule, MuzikaCoreModule, PLATFORM_TYPE_TOKEN } from '@muzika/core/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';
import { MuzikaIntroModule } from '../modules/intro/intro.module';
import { PostModule } from '../modules/post/post.module';
import { FooterComponent } from '../modules/shared/components/footer/footer.component';
import { LayoutComponent } from '../modules/shared/components/layout/layout.component';
import { NavbarComponent } from '../modules/shared/components/navbar/navbar.component';
import { SharedModule } from '../modules/shared/shared.module';
import { TestModule } from '../modules/test/test.module';
import { WebLoginPageComponent } from '../modules/prototype/pages/login/login.component';
import { MainPageComponent } from '../modules/prototype/pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { isPlatformBrowser } from '@angular/common';
import { Lang } from '@muzika/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    LayoutComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    /* Angular modules */
    BrowserModule.withServerTransition({ appId: 'muzika-universal' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    /* Muzika Modules */
    MuzikaCommonModule,
    MuzikaCoreModule,

    MuzikaIntroModule,
    TestModule,

    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SharedModule,

    /* Bootstrap modules */
    ModalModule.forRoot(),

    /* Material modules */
    MatButtonModule,
    MatCardModule,
    MatRadioModule,

    /* Sub-modules */
    PostModule
  ],
  providers: [
    {
      provide: EnvironmentTypeToken,
      useValue: environment.env
    },
    {
      provide: PLATFORM_TYPE_TOKEN,
      useValue: 'web'
    }
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
