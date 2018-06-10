import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MuzikaCommonModule, MuzikaCoreModule} from '@muzika/core';
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MuzikaCommonModule,
    MuzikaCoreModule,
    RouterModule,
  ],
  declarations: [
    SpinnerComponent,
  ],
  exports: [
    SpinnerComponent,
  ]
})
export class SharedModule {

}
