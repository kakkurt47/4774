import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SoundPrivacyPageComponent } from './page/privacy/privacy.component';
import { SoundMainPageComponent } from './page/main/main.component';


const routes: Route[] = [
  {
    path: 'sound-privacy',
    component: SoundPrivacyPageComponent
  },
  {
    path: 'sound',
    component: SoundMainPageComponent
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
export class SoundRoutingModule {
}
