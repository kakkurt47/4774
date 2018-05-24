import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrandIconModule} from './brand-icon.module';

@NgModule({
  imports: [
    BrandIconModule,
  ],
  providers: [

  ],
  exports: [
    BrandIconModule
  ]
})
export class SharedModule {

}
