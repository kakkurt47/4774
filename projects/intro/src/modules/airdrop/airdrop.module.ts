import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuzikaIntroSharedModule } from '../shared/shared.module';
import { AirdropRoutingModule } from './airdrop.route';
import { AirdropBreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { AirdropEndEventComponent } from './component/end-event/end-event.component';
import { AirdropEventComponent } from './page/event/event.component';
import { AirdropContentSubscribeComponent } from './component/content-subscribe/content-subscribe.component';
import { AirdropContentLikeComponent } from './component/content-like/content-like.component';
import { AirdropContentCommentComponent } from './component/content-comment/content-comment.component';
import { AirdropContentExchangeComponent } from './component/content-exchange/content-exchange.component';
import { AirdropMyWalletComponent } from './component/my-wallet/my-wallet.component';
import { LpModalComponent } from './component/lp-modal/lp-modal.component';
import { FormsModule } from '@angular/forms';
import { MuzikaIntroModule } from '../intro/intro.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MuzikaIntroSharedModule,
    MuzikaIntroModule,
    AirdropRoutingModule,
    TranslateModule
  ],
  declarations: [
    AirdropEventComponent,
    AirdropBreadcrumbComponent,
    AirdropContentSubscribeComponent,
    AirdropContentLikeComponent,
    AirdropContentCommentComponent,
    AirdropContentExchangeComponent,
    AirdropMyWalletComponent,
    AirdropEndEventComponent,
    LpModalComponent
  ]
})
export class AirdropModule {
}
