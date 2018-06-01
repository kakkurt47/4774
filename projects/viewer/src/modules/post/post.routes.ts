import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostCommunityListComponent, PostSheetListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {
  PostCommunityItemDetailComponent, PostSheetItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
import {PostSheetWriteCompleteComponent} from './pages/post-write-complete/sheet/post-sheet-write-complete.component';
import {PostCommunityWriteComponent, PostSheetWriteComponent, PostVideoWriteComponent} from './pages/post-write/post-write';
import {PostCommunityModifyComponent, PostSheetModifyComponent, PostVideoModifyComponent} from './pages/post-modify/post-modify';
const routes: Routes = [
  { path: 'board/community/write', component: PostCommunityWriteComponent },
  { path: 'board/sheet/write', component: PostSheetWriteComponent },
  { path: 'board/sheet/write/complete', component: PostSheetWriteCompleteComponent },
  { path: 'board/video/write', component: PostVideoWriteComponent },

  { path: 'board/community/modify', component: PostCommunityModifyComponent },
  { path: 'board/sheet/modify', component: PostSheetModifyComponent },
  { path: 'board/video/modify', component: PostVideoModifyComponent },

  {
    path: 'board/community',
    component: PostCommunityListComponent,
    children: [{ path: ':id', component: PostCommunityItemDetailComponent }]
  },
  {
    path: 'board/sheet',
    component: PostSheetListComponent,
    children: [{ path: ':id', component: PostSheetItemDetailComponent }]
  },
  {
    path: 'board/video',
    component: PostVideoListComponent,
    children: [{ path: ':id', component: PostVideoItemDetailComponent }]
  },
];

export const AppPostRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
