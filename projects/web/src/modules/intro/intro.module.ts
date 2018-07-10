import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MuzikaCommonModule, MuzikaCoreModule } from '@muzika/core/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { MzkIntroAdvisorsComponent } from './components/intro-advisors/mzk-intro-advisors.component';
import { IntroFooterComponent } from './components/intro-footer/intro-footer.component';
import { IntroLayoutComponent } from './components/intro-layout/intro-layout.component';
import { MzkIntroLeadershipComponent } from './components/intro-leadership/mzk-intro-leadership.component';
import { IntroNavbarComponent } from './components/intro-navbar/intro-navbar.component';
import { MzkIntroRoadmapComponent } from './components/intro-roadmap/mzk-intro-roadmap.component';
import { MzkIntroTeamComponent } from './components/intro-team/mzk-intro-team.component';
import { IntroRoutingModule } from './intro-routing.module';
import { IntroMainPageComponent } from './pages/intro-main/intro-main.component';
import { MzkIntroBusinessComponent } from './components/intro-business.component';
import { MzkIntroMZKCoinComponent } from './components/intro-mzk-coins.component';
import { MzkIntroEcosystemComponent } from './components/intro-ecosystem.component';
import { MzkIntroPartnersComponent } from './components/intro-investor.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,

    IntroRoutingModule,

    SharedModule,

    TranslateModule,
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
    MzkIntroPartnersComponent,

    /* Page Components */
    /* For introduction */
    IntroMainPageComponent
  ]
})
export class MuzikaIntroModule {
}

