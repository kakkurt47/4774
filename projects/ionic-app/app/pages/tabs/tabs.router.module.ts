import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPageComponent } from './tabs.page';
import { HomePageComponent } from '../home/home.page';
import { WalletPageComponent } from '../about/about.page';
import { SettingsPageComponent } from '../settings/settings.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPageComponent,
    children: [
      {
        path: 'home',
        outlet: 'home',
        component: HomePageComponent
      },
      {
        path: 'wallet',
        outlet: 'wallet',
        component: WalletPageComponent
      },
      {
        path: 'settings',
        outlet: 'settings',
        component: SettingsPageComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
