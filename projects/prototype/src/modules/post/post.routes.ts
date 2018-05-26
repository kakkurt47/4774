import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostFreeListComponent, PostMusicListComponent, PostVideoListComponent} from './pages/post-list/post-list';
const routes: Routes = [
  { path: 'board/community', component: PostFreeListComponent },
  { path: 'board/sheet', component: PostMusicListComponent },
  { path: 'board/video', component: PostVideoListComponent },
];

export const AppPostRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
