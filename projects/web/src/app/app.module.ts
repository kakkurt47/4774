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
import {environment} from '../environments/environment';
import {MuzikaAlertModule} from '../modules/alert/alert.module';
import {MuzikaIntroModule} from '../modules/intro/intro.module';
import {PostModule} from '../modules/post/post.module';
import {SharedModule} from '../modules/shared/shared.module';
import {LoginPageComponent} from '../pages/login/login.component';
import {MainPageComponent} from '../pages/main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    /* For main */
    MainPageComponent,
    LoginPageComponent
  ],
  imports: [
    /* Angular modules */
    BrowserModule.withServerTransition({appId: 'muzika-universal'}),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MuzikaIntroModule,

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

    /* Muzika Modules */
    MuzikaCommonModule,
    MuzikaCoreModule.forRoot(environment.env),

    /* Sub-modules */
    MuzikaAlertModule,
    PostModule,
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
