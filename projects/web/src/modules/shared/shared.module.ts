import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MuzikaCommonModule, MuzikaCoreModule} from '@muzika/core';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MuzikaCommonModule,
    MuzikaCoreModule,
    RouterModule,
    TranslateModule,
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
