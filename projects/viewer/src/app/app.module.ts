import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MuzikaCoreModule, PLATFORM_TYPE_TOKEN, SharedModule} from '@muzika/core';
// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ModalModule} from 'ngx-bootstrap/modal';
import {environment} from '../environments/environment';
import {PostModule} from '../modules/post/post.module';
import {WalletModule} from '../modules/wallet/wallet.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MuzikaAppsComponent} from './components/muzika-apps/muzika-apps.component';
import {ArtistSheetComponent} from './components/artist-sheet/artist-sheet.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SpinnerComponent} from './components/spinner/spinner.component';

import {WebviewDirective} from './directives/webview.directive';
import {IPFSTestPageComponent} from './pages/ipfs-test/ipfs-test.component';
import {LoginPageComponent} from './pages/login/login.component';
import {MainPageComponent} from './pages/main/main.component';

import {ElectronService} from './providers/electron.service';
import {IpcRendererService} from './services/ipc-renderer.service';
import {MuzikaAlertModule} from '../modules/alert/alert.module';
import {MuzikaWalletProvider} from './providers/muzika-wallet.provider';
import {TabService} from './services/tab.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MuzikaAppsComponent,

    WebviewDirective,

    /* Reusable Components */
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    ArtistSheetComponent,

    /* Page Components */
    MainPageComponent,
    LoginPageComponent,
    IPFSTestPageComponent,
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

    WalletModule,
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
    SharedModule,
    MuzikaCoreModule.forRoot(environment.env),

    /* Sub-modules */
    MuzikaAlertModule,
    PostModule,
  ],
  providers: [
    ElectronService,
    IpcRendererService,
    TabService,
    MuzikaWalletProvider,
    {
      provide: PLATFORM_TYPE_TOKEN,
      useValue: 'electron'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ipcService: IpcRendererService) {
    ipcService.init();
  }
}
