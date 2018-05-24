import {NgModule} from '@angular/core';
import {JsonIconComponent, LedgerIconComponent, MuzikaIconComponent, TrezorIconComponent} from './components';

@NgModule({
  declarations: [
    LedgerIconComponent,
    JsonIconComponent,
    MuzikaIconComponent,
    TrezorIconComponent
  ],
  exports: [
    LedgerIconComponent,
    JsonIconComponent,
    MuzikaIconComponent,
    TrezorIconComponent
  ]
})
export class BrandIconModule {

}
