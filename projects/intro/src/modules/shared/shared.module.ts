import { NgModule } from '@angular/core';
import { SimpleMDConverterPipe } from './md-convert.pipe';
import { Nl2brPipe } from './nl2br.pipe';

@NgModule({
  declarations: [
    Nl2brPipe,
    SimpleMDConverterPipe,
  ],
  exports: [
    Nl2brPipe,
    SimpleMDConverterPipe,
  ]
})
export class MuzikaIntroSharedModule {
}
