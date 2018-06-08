import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MuzikaCommonModule, MuzikaCoreModule} from '@muzika/core';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {FooterComponent} from './components/footer/footer.component';
import {LayoutComponent} from './components/layout/layout.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MuzikaCommonModule,
    MuzikaCoreModule,
    RouterModule,
  ],
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    SpinnerComponent,
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    SpinnerComponent,
  ]
})
export class SharedModule {

}
