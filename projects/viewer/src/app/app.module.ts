import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocalStorage, MuzikaCoreModule, PLATFORM_TYPE_TOKEN, MuzikaCommonModule } from '@muzika/core/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ArtistMusicComponent } from '../components/artist-music/artist-music.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MuzikaAppsComponent } from '../components/muzika-apps/muzika-apps.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { environment } from '../environments/environment';
import { PostModule } from '../modules/post/post.module';
import { WalletModule } from '../modules/wallet/wallet.module';
import { IPFSTestPageComponent } from '../pages/ipfs-test/ipfs-test.component';
import { LoginPageComponent } from '../pages/login/login.component';
import { MainPageComponent } from '../pages/main/main.component';
import { ElectronLocalStorage } from '../providers/electron-localstorage.service';
import { IpcRendererService } from '../providers/ipc-renderer.service';

import { WebviewDirective } from '../providers/webview.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronService } from '../providers/electron.service';
import { MuzikaConsole } from '@muzika/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

declare const document;

@NgModule({
  declarations: [
    AppComponent,
    MuzikaAppsComponent,

    WebviewDirective,

    /* Reusable Components */
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    ArtistMusicComponent,

    /* Page Components */
    MainPageComponent,
    LoginPageComponent,
    IPFSTestPageComponent
  ],
  imports: [
    /* Angular modules */
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'muzika-universal' }),
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
    MuzikaCommonModule,
    MuzikaCoreModule.forRoot(environment.env),

    /* Sub-modules */
    PostModule
  ],
  providers: [
    {
      provide: PLATFORM_TYPE_TOKEN,
      useValue: 'electron'
    },
    {
      provide: LocalStorage,
      useClass: ElectronLocalStorage
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ipcService: IpcRendererService,
              electronService: ElectronService,
              @Inject(PLATFORM_ID) private platformId: string) {
    ipcService.init();

    if (isPlatformBrowser(this.platformId)) {
      document.ondragover = document.ondrop = (ev) => {
        ev.preventDefault();
      };

      document.body.ondrop = (ev) => {
        MuzikaConsole.log(ev.dataTransfer.files[0].path + ' File selected');
        electronService.onDragFile.next(ev.dataTransfer.files[0]);
        ev.preventDefault();
      };
    }
  }
}
