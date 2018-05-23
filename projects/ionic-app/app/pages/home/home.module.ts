import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home.page';
import {BrandIconModule} from '@muzika/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrandIconModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }])
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule {}
