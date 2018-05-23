import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletPageComponent } from './about.page';
import {BrandIconModule} from '@muzika/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrandIconModule,
    RouterModule.forChild([{ path: '', component: WalletPageComponent }])
  ],
  declarations: [WalletPageComponent]
})
export class AboutPageModule {}
