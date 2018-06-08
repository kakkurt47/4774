import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MuzikaCoreModule, PLATFORM_TYPE_TOKEN, MuzikaCommonModule} from '@muzika/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FooterComponent} from '../components/footer/footer.component';
import {IntroFooterComponent} from '../components/intro-footer/intro-footer.component';
import {IntroNavbarComponent} from '../components/intro-navbar/intro-navbar.component';
import {LayoutIntroComponent, LayoutMainComponent} from '../components/layout/layout.component';
import {environment} from '../environments/environment';
import {IntroMainPageComponent} from '../pages/intro-main/intro-main.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {SpinnerComponent} from '../components/spinner/spinner.component';
import {MainPageComponent} from '../pages/main/main.component';
import {MuzikaAlertModule} from '../modules/alert/alert.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    /* Reusable Components */
    LayoutIntroComponent,
    LayoutMainComponent,
    IntroNavbarComponent,
    NavbarComponent,
    IntroFooterComponent,
    FooterComponent,
    SpinnerComponent,

    /* Page Components */
    /* For introduction */
    IntroMainPageComponent,

    /* For main */
    MainPageComponent,
  ],
  imports: [
    /* Angular modules */
    CommonModule,
    BrowserModule.withServerTransition({appId: 'muzika-universal'}),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
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
    MatRadioModule,

    /* Muzika Modules */
    MuzikaCommonModule,
    MuzikaCoreModule.forRoot(environment.env),

    /* Sub-modules */
    MuzikaAlertModule,
  ],
  providers: [
    {
      provide: PLATFORM_TYPE_TOKEN,
      useValue: 'web'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
