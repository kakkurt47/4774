import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostFreeListComponent, PostMusicListComponent, PostVideoListComponent} from './pages/post-list/post-list';
const routes: Routes = [
  { path: 'board/free', component: PostFreeListComponent },
  { path: 'board/music', component: PostMusicListComponent },
  { path: 'board/video', component: PostVideoListComponent },
];

export const AppPostRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
