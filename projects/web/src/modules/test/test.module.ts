import {VideoPageComponent} from './pages/video/video.component';
import {NgModule} from '@angular/core';
import {TestRoutingModule} from './test-routing.module';

@NgModule({
  imports: [
    /* Muzika Modules */
    TestRoutingModule,
  ],
  declarations: [
    /* Pages */
    VideoPageComponent,
  ],
  exports: [
  ]
})
export class TestModule {

}
