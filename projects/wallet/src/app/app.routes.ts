import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './page/main/main.component';
import {TestPageComponent} from './page/test/test.component';
import {WalletPageComponent} from './page/wallet/wallet.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'wallet', component: WalletPageComponent }
];

export const AppRouteModule: ModuleWithProviders = RouterModule.forRoot(routes);
