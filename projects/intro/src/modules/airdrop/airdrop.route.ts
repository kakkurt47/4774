import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AirdropEventComponent } from './page/event/event.component';


const routes: Route[] = [
  {
    path: 'airdrop-event',
    component: AirdropEventComponent
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
export class AirdropRoutingModule {

}
