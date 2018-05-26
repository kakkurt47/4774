import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostFreeListComponent, PostMusicListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {
  PostFreeItemDetailComponent, PostMusicItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
import {PostFreeWriteComponent, PostMusicWriteComponent, PostVideoWriteComponent} from './pages/post-write/post-write';
import {PostFreeModifyComponent, PostMusicModifyComponent, PostVideoModifyComponent} from './pages/post-modify/post-modify';
const routes: Routes = [
  { path: 'board/free/write', component: PostFreeWriteComponent },
  { path: 'board/music/write', component: PostMusicWriteComponent },
  { path: 'board/video/write', component: PostVideoWriteComponent },

  { path: 'board/free/modify', component: PostFreeModifyComponent },
  { path: 'board/music/modify', component: PostMusicModifyComponent },
  { path: 'board/video/modify', component: PostVideoModifyComponent },

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
