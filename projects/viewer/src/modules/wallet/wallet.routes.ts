
import {LoginPageComponent} from './pages/login/login.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
];

export const WalletRoutesModule = RouterModule.forRoot(routes, {useHash: true});
