import {CommonModule, isPlatformBrowser} from '@angular/common';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {NgModule, PLATFORM_ID, Inject} from '@angular/core';
import {BrowserTransferStateModule, TransferState} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Lang} from '@muzika/core';
import {MuzikaCommonModule, MuzikaCoreModule, LocalStorage} from '@muzika/core/angular';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../../environments/environment';
import {SharedModule} from '../shared/shared.module';
import {IntroAdvisorsComponent} from './components/intro-advisors/intro-advisors.component';
import {IntroFooterComponent} from './components/intro-footer/intro-footer.component';
import {IntroLayoutComponent} from './components/intro-layout/intro-layout.component';
import {IntroLeadershipComponent} from './components/intro-leadership/intro-leadership.component';
import {IntroNavbarComponent} from './components/intro-navbar/intro-navbar.component';
import {IntroRoadmapComponent} from './components/intro-roadmap/intro-roadmap.component';
import {IntroTeamComponent} from './components/intro-team/intro-team.component';
import {IntroRoutingModule} from './intro-routing.module';
import {IntroMainPageComponent} from './pages/intro-main/intro-main.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,

    IntroRoutingModule,

    SharedModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, PLATFORM_ID, TransferState]
      }
    }),

    /* Muzika Modules */
    MuzikaCommonModule,
    MuzikaCoreModule.forRoot(environment.env),
  ],
  declarations: [
    /* Reusable Components */
    IntroLayoutComponent,
    IntroNavbarComponent,
    IntroFooterComponent,

    IntroRoadmapComponent,
    IntroTeamComponent,
    IntroAdvisorsComponent,
    IntroLeadershipComponent,

    /* Page Components */
    /* For introduction */
    IntroMainPageComponent,
  ]
})
export class MuzikaIntroModule {
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
  }
}

