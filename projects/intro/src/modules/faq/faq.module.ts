import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuzikaIntroModule } from '../intro/intro.module';
import { TranslateModule } from '@ngx-translate/core';
import { FAQQAComponent } from './component/qa/qa.component';
import { FAQRoutingModule } from './faq.route';
import { SimpleMDConverterPipe } from './md-convert.pipe';
import { FAQMainPageComponent } from './page/main/main.component';


@NgModule({
  imports: [
    CommonModule,
    MuzikaIntroModule,
    TranslateModule,
    FAQRoutingModule
  ],
  declarations: [
    SimpleMDConverterPipe,
    FAQMainPageComponent,
    FAQQAComponent
  ]
})
export class FAQModule {
}
