import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostFreeListComponent, PostMusicListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {
  PostFreeItemDetailComponent, PostMusicItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
const routes: Routes = [
  {
    path: 'board/free',
    component: PostFreeListComponent,
    children: [{ path: ':id', component: PostFreeItemDetailComponent }]
  },
  {
    path: 'board/music',
    component: PostMusicListComponent,
    children: [{ path: ':id', component: PostMusicItemDetailComponent }]
  },
  {
    path: 'board/video',
    component: PostVideoListComponent,
    children: [{ path: ':id', component: PostVideoItemDetailComponent }]
  },
];

export const AppPostRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
