import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MuzikaIntroSharedModule } from '../shared/shared.module';
import { MzkIntroAdvisorsComponent } from './components/intro-advisors/mzk-intro-advisors.component';
import { MzkIntroBusinessIdeaComponent } from './components/intro-business-idea/mzk-intro-business-idea.component';
import { MzkIntroCountdownNumberComponent } from './components/intro-countdown/intro-countdown-nubmer.component';
import { IntroFooterComponent } from './components/intro-footer/intro-footer.component';
import { IntroLayoutComponent } from './components/intro-layout/intro-layout.component';
import { MzkIntroLeadershipComponent } from './components/intro-leadership/mzk-intro-leadership.component';
import { IntroNavbarComponent } from './components/intro-navbar/intro-navbar.component';
import { MzkIntroPressComponent } from './components/intro-press.component';
import { MzkIntroRoadmapImageComponent } from './components/intro-roadmap/mzk-intro-roadmap-img.component';
import { MzkIntroRoadmapComponent } from './components/intro-roadmap/mzk-intro-roadmap.component';
import { MzkIntroTeamComponent } from './components/intro-team/mzk-intro-team.component';
import { MzkIntroCountdownComponent } from './components/intro-countdown/intro-countdown.component';
import { MzkIntroTokenMetricsComponent } from './components/intro-token-metrics/mzk-intro-token-metrics.component';
import { IntroRoutingModule } from './intro-routing.module';
import { IntroEcosystemPageComponent } from './pages/intro-ecosystem/intro-ecosystem.component';
import { IntroMainPageComponent } from './pages/intro-main/intro-main.component';
import { MzkIntroBusinessComponent } from './components/intro-business.component';
import { MzkIntroMZKCoinComponent } from './components/intro-mzk-coins.component';
import { MzkIntroEcosystemComponent } from './components/intro-ecosystem.component';
import { MzkIntroPartnersComponent } from './components/intro-partners.component';
import { MzkIntroFloatingBtnsComponent } from './components/intro-floating-btns/mzk-intro-floating-btns.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MuzikaIconComponent } from '../../muzika-icon/muzika-icon.component';
import { RouterModule } from '@angular/router';
import { MzkIntroInvestorsComponent } from './components/intro-investors.component';
import { IntroManualPageComponent } from './pages/intro-manual/intro-manual.component';
import { ListingPopupComponent } from './components/listing-popup/listing-popup.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    RouterModule,

    MuzikaIntroSharedModule,
    IntroRoutingModule,

    BsDropdownModule.forRoot(),

    TranslateModule,
  ],
  declarations: [
    /* Reusable Components */
    IntroLayoutComponent,
    IntroNavbarComponent,
    IntroFooterComponent,

    MuzikaIconComponent,

    MzkIntroRoadmapComponent,
    MzkIntroTeamComponent,
    MzkIntroAdvisorsComponent,
    MzkIntroLeadershipComponent,
    MzkIntroBusinessComponent,
    MzkIntroPressComponent,
    MzkIntroEcosystemComponent,
    MzkIntroMZKCoinComponent,
    MzkIntroPartnersComponent,
    MzkIntroInvestorsComponent,
    MzkIntroFloatingBtnsComponent,
    MzkIntroCountdownComponent,
    MzkIntroCountdownNumberComponent,
    MzkIntroBusinessIdeaComponent,
    MzkIntroTokenMetricsComponent,
    MzkIntroRoadmapImageComponent,

    ListingPopupComponent,

    /* Page Components */
    /* For introduction */
    IntroMainPageComponent,
    IntroEcosystemPageComponent,
    IntroManualPageComponent,
  ],
  exports: [
    IntroNavbarComponent
  ]
})
export class MuzikaIntroModule {
}

