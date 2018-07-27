import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirdropRoutingModule } from './airdrop.route';
import { AirdropBreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { AirdropEventComponent } from './page/event/event.component';


@NgModule({
  imports: [
    CommonModule,
    AirdropRoutingModule
  ],
  declarations: [
    AirdropEventComponent,
    AirdropBreadcrumbComponent
  ]
})
export class AirdropModule {
}
