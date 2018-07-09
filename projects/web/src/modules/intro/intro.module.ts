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
import {MzkIntroAdvisorsComponent} from './components/intro-advisors/mzk-intro-advisors.component';
import {IntroFooterComponent} from './components/intro-footer/intro-footer.component';
import {IntroLayoutComponent} from './components/intro-layout/intro-layout.component';
import {MzkIntroLeadershipComponent} from './components/intro-leadership/mzk-intro-leadership.component';
import {IntroNavbarComponent} from './components/intro-navbar/intro-navbar.component';
import {MzkIntroRoadmapComponent} from './components/intro-roadmap/mzk-intro-roadmap.component';
import {MzkIntroTeamComponent} from './components/intro-team/mzk-intro-team.component';
import {IntroRoutingModule} from './intro-routing.module';
import {IntroMainPageComponent} from './pages/intro-main/intro-main.component';
import { MzkIntroBusinessComponent } from './components/intro-business.component';
import { MzkIntroMZKCoinComponent } from './components/intro-mzk-coins.component';
import { MzkIntroEcosystemComponent } from './components/intro-ecosystem.component';
import { MzkIntroInvestorComponent } from './components/intro-investor.component';

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
    MuzikaCoreModule
  ],
  declarations: [
    /* Reusable Components */
    IntroLayoutComponent,
    IntroNavbarComponent,
    IntroFooterComponent,

    MzkIntroRoadmapComponent,
    MzkIntroTeamComponent,
    MzkIntroAdvisorsComponent,
    MzkIntroLeadershipComponent,
    MzkIntroBusinessComponent,
    MzkIntroEcosystemComponent,
    MzkIntroMZKCoinComponent,
    MzkIntroInvestorComponent,

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

