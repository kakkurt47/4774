import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuzikaIntroModule } from '../intro/intro.module';
import { TranslateModule } from '@ngx-translate/core';
import { MuzikaIntroSharedModule } from '../shared/shared.module';
import { FAQQAComponent } from './component/qa/qa.component';
import { FAQRoutingModule } from './faq.route';
import { FAQMainPageComponent } from './page/main/main.component';


@NgModule({
  imports: [
    CommonModule,
    MuzikaIntroSharedModule,
    MuzikaIntroModule,
    TranslateModule,
    FAQRoutingModule
  ],
  declarations: [
    FAQMainPageComponent,
    FAQQAComponent
  ]
})
export class FAQModule {
}
