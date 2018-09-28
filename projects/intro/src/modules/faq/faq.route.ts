import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FAQMainPageComponent } from './page/main/main.component';


const routes: Route[] = [
  {
    path: 'faq',
    component: FAQMainPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FAQRoutingModule {

}
