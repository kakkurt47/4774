import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main/main.component';
import { WebLoginPageComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: WebLoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrototypeRoutingModule {
}
