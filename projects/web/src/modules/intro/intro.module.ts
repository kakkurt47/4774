import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MuzikaCommonModule, MuzikaCoreModule} from '@muzika/core';
import {IntroFooterComponent} from './components/intro-footer/intro-footer.component';
import {IntroLayoutComponent} from './components/intro-layout/intro-layout.component';
import {IntroNavbarComponent} from './components/intro-navbar/intro-navbar.component';
import {environment} from '../../environments/environment';
import {IntroMainPageComponent} from './pages/intro-main/intro-main.component';
import {SharedModule} from '../shared/shared.module';
import {IntroRoutingModule} from './intro-routing.module';
import {IntroRoadmapComponent} from './components/intro-roadmap/intro-roadmap.component';
import {IntroTeamComponent} from './components/intro-team/intro-team.component';
import {IntroAdvisorsComponent} from './components/intro-advisors/intro-advisors.component';
import {IntroLeadershipComponent} from './components/intro-leadership/intro-leadership.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,

    IntroRoutingModule,

    SharedModule,

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

}

