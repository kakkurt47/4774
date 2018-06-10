import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../components/layout/layout.component';
import {LoginPageComponent} from '../pages/login/login.component';
import {MainPageComponent} from '../pages/main/main.component';

const mainRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginPageComponent}
];

const routes: Routes = [
  {
    path: 'beta',
    component: LayoutComponent,
    children: mainRoutes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
