import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './page/login/login.component';
import {MainPageComponent} from './page/main/main.component';
import {WalletPageComponent} from './page/wallet/wallet.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
];

export const AppRouteModule: ModuleWithProviders = RouterModule.forRoot(routes);
