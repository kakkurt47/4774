
import {WalletHomeComponent} from './pages/home/home.component';
import {LoginPageComponent} from './pages/login/login.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/(wallet:home)'},
  { path: 'home', component: WalletHomeComponent, outlet: 'wallet' },
  { path: '**', component: WalletHomeComponent, outlet: 'wallet' }
];

export const WalletRoutesModule = RouterModule.forRoot(routes, {useHash: true});
