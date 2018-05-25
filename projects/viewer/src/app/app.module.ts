import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule, Provider} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import {BASE_API_URL, baseApiUrl, baseApiUrlDev, baseApiUrlStage, MuzikaCoreModule, SharedModule} from '@muzika/core';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {ArtistSheetComponent} from './components/artist-sheet/artist-sheet.component';
import {LoginPageComponent} from './pages/login/login.component';
import {FooterComponent} from './components/footer/footer.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {MainPageComponent} from './pages/main/main.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {PostModule} from '../modules/post/post.module';
import {ModalModule} from 'ngx-bootstrap/modal';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    WebviewDirective,

    /* Reusable Components */
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    ArtistSheetComponent,

    /* Page Components */
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

    /* Muzika Modules */
    SharedModule,
    MuzikaCoreModule.forRoot(environment.env),

    /* Sub-modules */
    PostModule,
  ],
  providers: [
    ElectronService,
    baseApiUrlProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
