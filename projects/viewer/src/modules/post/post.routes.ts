import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCommunityListComponent, PostMusicListComponent, PostVideoListComponent } from './pages/post-list/post-list';
import {
  PostCommunityItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
import { PostMusicWriteCompleteComponent } from './pages/post-write-complete/music/post-music-write-complete.component';
import {
  PostCommunityWriteComponent,
  PostVideoWriteComponent
} from './pages/post-write/post-write';
import { PostCommunityModifyComponent, PostMusicModifyComponent, PostVideoModifyComponent } from './pages/post-modify/post-modify';
import { PostSheetMusicWriteComponent } from './pages/post-write/sheet/post-sheet-write.component';
import { PostStreamingMusicWriteComponent } from './pages/post-write/streaming/post-streaming-write.component';
import { PostMySheetsComponent } from './pages/post-my-sheets/post-my-sheets.component';
import { PostMyStreamingsComponent } from './pages/post-my-streamings/post-my-streamings.component';
import { PostStreamingItemDetailComponent } from './pages/post-item-detail/music/post-streaming-item-detail.component';
import { PostSheetItemDetailComponent } from './pages/post-item-detail/sheets/post-sheet-item-detail.component';
import {PostDraftListComponent} from './pages/post-draft-list/post-draft-list.component';

const routes: Routes = [
  { path: 'board/:type/draft', component: PostDraftListComponent },
  { path: 'board/community/write', component: PostCommunityWriteComponent },
  { path: 'board/streaming/write', component: PostStreamingMusicWriteComponent },
  { path: 'board/streaming/write/complete', component: PostMusicWriteCompleteComponent },
  { path: 'board/sheet/write', component: PostSheetMusicWriteComponent },
  { path: 'board/sheet/write/complete', component: PostMusicWriteCompleteComponent },
  { path: 'board/video/write', component: PostVideoWriteComponent },

  { path: 'board/community/modify', component: PostCommunityModifyComponent },
  { path: 'board/music/modify', component: PostMusicModifyComponent },
  { path: 'board/video/modify', component: PostVideoModifyComponent },

  { path: 'board/sheet/my', component: PostMySheetsComponent },
  { path: 'board/streaming/my', component: PostMyStreamingsComponent },

  {
    path: 'board/community',
    component: PostCommunityListComponent,
    children: [{ path: ':id', component: PostCommunityItemDetailComponent }]
  },
  {
    path: 'board/streaming',
    component: PostMusicListComponent,
    children: [{ path: ':id', component: PostStreamingItemDetailComponent }]
  },
  {
    path: 'board/sheet',
    component: PostMusicListComponent,
    children: [{ path: ':id', component: PostSheetItemDetailComponent }]
  },
  {
    path: 'board/video',
    component: PostVideoListComponent,
    children: [{ path: ':id', component: PostVideoItemDetailComponent }]
  },
];

export const AppPostRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
