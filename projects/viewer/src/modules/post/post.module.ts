import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,

    AppPostRouteModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  declarations: [
    PostListItemComponent,
    PostSheetComponent,

    /* Pages */
    PostFreeListComponent,
    PostMusicListComponent,
    PostVideoListComponent,
    PostFreeItemDetailComponent,
    PostMusicItemDetailComponent,
    PostVideoItemDetailComponent,
  ],
  exports: [
    PostListItemComponent,
    PostSheetComponent,
  ]
})
export class PostModule {

}
