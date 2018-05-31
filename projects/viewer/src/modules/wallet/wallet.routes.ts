
import {WalletHomeComponent} from './pages/home/home.component';
import {Routes, RouterModule} from '@angular/router';
import {WalletSignPersonalMessageComponent} from './pages/sign-personal-message/sign-personal-message.component';
import {WalletSignTransactionComponent} from './pages/sign-transaction/sign-transaction.component';
import {WalletListComponent} from './pages/wallet-list/wallet-list.component';

const routes: Routes = [
  { path: 'home', component: WalletListComponent },
  { path: 'sign-message', component: WalletSignPersonalMessageComponent },
  { path: 'sign-transaction', component: WalletSignTransactionComponent },
  // { path: '**', component: WalletHomeComponent }
];

export const WalletRoutesModule = RouterModule.forRoot([
  { path: '', pathMatch: 'full', redirectTo: '/(wallet:home)'},
  {
    path: '',
    outlet: 'wallet',
    component: WalletHomeComponent,
    children: [...routes]
  }
], {useHash: true});
