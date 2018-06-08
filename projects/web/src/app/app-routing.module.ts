import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutIntroComponent, LayoutMainComponent} from '../components/layout/layout.component';
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
    component: LayoutIntroComponent,
    children: introRoutes
  },
  {
    path: 'beta',
    component: LayoutMainComponent,
    children: mainRoutes
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
