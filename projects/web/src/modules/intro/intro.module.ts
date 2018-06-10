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

    /* Page Components */
    /* For introduction */
    IntroMainPageComponent,
  ]
})
export class MuzikaIntroModule {

}

