import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '@muzika/core';
import {PostListItemComponent} from './components/post-list-item/post-list-item.component';
import {PostSheetComponent} from './components/post-sheet/post-sheet.component';
import {PostFreeListComponent, PostMusicListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {AppPostRouteModule} from './post.routes';
import {
  PostFreeItemDetailComponent, PostMusicItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {PostFreeWriteComponent, PostMusicWriteComponent, PostVideoWriteComponent} from './pages/post-write/post-write';
import {PostFreeModifyComponent, PostMusicModifyComponent, PostVideoModifyComponent} from './pages/post-modify/post-modify';
import {MatButtonModule} from '@angular/material';
import {PostItemDetailHeaderComponent} from './components/post-item-detail-header/post-item-detail-header.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    AppPostRouteModule,

    MatButtonModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  declarations: [
    PostListItemComponent,
    PostSheetComponent,
    PostItemDetailHeaderComponent,

    /* Pages */
    PostFreeListComponent,
    PostFreeItemDetailComponent,
    PostFreeModifyComponent,
    PostFreeWriteComponent,

    PostMusicListComponent,
    PostMusicItemDetailComponent,
    PostMusicWriteComponent,
    PostMusicModifyComponent,

    PostVideoListComponent,
    PostVideoItemDetailComponent,
    PostVideoWriteComponent,
    PostVideoModifyComponent,
  ],
  exports: [
    PostListItemComponent,
    PostSheetComponent,
  ]
})
export class PostModule {

}
