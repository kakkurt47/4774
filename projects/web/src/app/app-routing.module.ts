import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IntroLayoutComponent} from '../components/intro-layout/intro-layout.component';
import {LayoutComponent} from '../modules/shared/components/layout/layout.component';
import {IntroMainPageComponent} from '../pages/intro-main/intro-main.component';
import {MainPageComponent} from '../pages/main/main.component';

const introRoutes: Routes = [
  { path: '', component: IntroMainPageComponent }
];

const mainRoutes: Routes = [
  { path: '', component: MainPageComponent }
];

const routes: Routes = [
  // @TODO Add introduction page routing
  {
    path: '',
    component: IntroLayoutComponent,
    children: introRoutes
  },
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
export class AppRoutingModule { }
