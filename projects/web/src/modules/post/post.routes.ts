import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../shared/components/layout/layout.component';
import {PostCommunityListComponent, PostSheetListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {
  PostCommunityItemDetailComponent, PostSheetItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';

const routes: Routes = [
  {
    path: 'board/community',
    component: PostCommunityListComponent,
    children: [{ path: ':id', component: PostCommunityItemDetailComponent }]
  },
  {
    path: 'board/sheet',
    children: [
      { path: '', component: PostSheetListComponent },
      { path: ':id', component: PostSheetItemDetailComponent }
    ]
  },
  {
    path: 'board/video',
    component: PostVideoListComponent,
    children: [{ path: ':id', component: PostVideoItemDetailComponent }]
  },
];

export const AppPostRouteModule: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'beta',
    component: LayoutComponent,
    children: routes
  }
]);
