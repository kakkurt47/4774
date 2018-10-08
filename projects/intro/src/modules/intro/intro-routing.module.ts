import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IntroLayoutComponent} from './components/intro-layout/intro-layout.component';
import { IntroEcosystemPageComponent } from './pages/intro-ecosystem/intro-ecosystem.component';
import {IntroMainPageComponent} from './pages/intro-main/intro-main.component';
import { IntroManualPageComponent } from './pages/intro-manual/intro-manual.component';

const introRoutes: Routes = [
  {path: '', component: IntroMainPageComponent},
  {path: 'ecosystem', component: IntroEcosystemPageComponent},
  {path: 'manual', component: IntroManualPageComponent},
];

const routes: Routes = [
  // @TODO Add introduction page routing
  {
    path: '',
    component: IntroLayoutComponent,
    children: introRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IntroRoutingModule {
}
