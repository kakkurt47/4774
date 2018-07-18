import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrototypeRoutingModule } from './prototype-routing.module';
import { MainPageComponent } from './pages/main/main.component';
import { WebLoginPageComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrototypeRoutingModule
  ],
  declarations: [
    /* For main */
    MainPageComponent,
    WebLoginPageComponent,
  ]
})
export class PrototypeModule {

}
