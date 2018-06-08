import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {MuzikaCommonModule, MuzikaCoreModule} from '@muzika/core';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {PostCommentComponent} from './components/post-comment/post-comment.component';
import {PostItemDetailHeaderComponent} from './components/post-item-detail-header/post-item-detail-header.component';
import {PostListItemComponent} from './components/post-list-item/post-list-item.component';
import {PostSheetComponent} from './components/post-sheet/post-sheet.component';
import {
  PostCommunityItemDetailComponent,
  PostSheetItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
import {PostCommunityListComponent, PostSheetListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {PostCommunityModifyComponent, PostSheetModifyComponent, PostVideoModifyComponent} from './pages/post-modify/post-modify';
import {PostSheetWriteCompleteComponent} from './pages/post-write-complete/sheet/post-sheet-write-complete.component';
import {PostCommunityWriteComponent, PostSheetWriteComponent, PostVideoWriteComponent} from './pages/post-write/post-write';
import {AppPostRouteModule} from './post.routes';
import {YoutubeVideoCellComponent} from './components/youtube-video-cell/youtube-video-cell.component';
import {MuzikaAlertModule} from '../alert/alert.module';
import {NgUploaderModule} from 'ngx-uploader';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MuzikaCommonModule,

    AppPostRouteModule,

    MuzikaCoreModule,
    MatButtonModule,
    MuzikaAlertModule,
    NgUploaderModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  declarations: [
    PostListItemComponent,
    PostSheetComponent,
    PostItemDetailHeaderComponent,

    PostCommentComponent,

    YoutubeVideoCellComponent,

    /* Pages */
    PostCommunityListComponent,
    PostCommunityItemDetailComponent,
    PostCommunityModifyComponent,
    PostCommunityWriteComponent,

    PostSheetListComponent,
    PostSheetItemDetailComponent,
    PostSheetWriteComponent,
    PostSheetModifyComponent,
    PostSheetWriteCompleteComponent,

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
