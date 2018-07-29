import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirdropRoutingModule } from './airdrop.route';
import { AirdropBreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { AirdropEventComponent } from './page/event/event.component';
import { AirdropContentSubscribeComponent } from './component/content-subscribe/content-subscribe.component';
import { AirdropContentLikeComponent } from './component/content-like/content-like.component';
import { AirdropContentCommentComponent } from './component/content-comment/content-comment.component';
import { AirdropContentExchangeComponent } from './component/content-exchange/content-exchange.component';
import { AirdropMyWalletComponent } from './component/my-wallet/my-wallet.component';
import { LpModalComponent } from './component/lp-modal/lp-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AirdropRoutingModule
  ],
  declarations: [
    AirdropEventComponent,
    AirdropBreadcrumbComponent,
    AirdropContentSubscribeComponent,
    AirdropContentLikeComponent,
    AirdropContentCommentComponent,
    AirdropContentExchangeComponent,
    AirdropMyWalletComponent,
    LpModalComponent
  ]
})
export class AirdropModule {
}
