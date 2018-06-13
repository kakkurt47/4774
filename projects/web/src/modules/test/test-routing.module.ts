import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoPageComponent} from './pages/video/video.component';
import {LayoutComponent} from '../shared/components/layout/layout.component';


const testRoutes: Routes = [
  {path: 'video', component: VideoPageComponent}
];


const routes: Routes = [
  {
    path: 'test',
    component: LayoutComponent,
    children: testRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {
}
