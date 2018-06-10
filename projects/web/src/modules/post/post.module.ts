import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {MuzikaCommonModule, MuzikaCoreModule} from '@muzika/core';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {SharedModule} from '../shared/shared.module';
import {PostCommentComponent} from './components/post-comment/post-comment.component';
import {PostItemDetailHeaderComponent} from './components/post-item-detail-header/post-item-detail-header.component';
import {PostListItemComponent} from './components/post-list-item/post-list-item.component';
import {PostMusicComponent} from './components/post-music/post-music.component';
import {
  PostCommunityItemDetailComponent,
  PostMusicItemDetailComponent,
  PostVideoItemDetailComponent
} from './pages/post-item-detail/post-item-detail';
import {PostCommunityListComponent, PostMusicListComponent, PostVideoListComponent} from './pages/post-list/post-list';
import {AppPostRouteModule} from './post.routes';
import {YoutubeVideoCellComponent} from './components/youtube-video-cell/youtube-video-cell.component';
import {MuzikaAlertModule} from '../alert/alert.module';
import {NgUploaderModule} from 'ngx-uploader';

@NgModule({
  imports: [
    /* Angular Modules */
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    /* Muzika Modules */
    MuzikaCommonModule,
    MuzikaCoreModule,

    /* Material & Bootstrap Modules */
    MatButtonModule,
    NgUploaderModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

    /* Dependencies */
    MuzikaAlertModule,
    SharedModule,
    AppPostRouteModule,
  ],
  declarations: [
    PostListItemComponent,
    PostMusicComponent,
    PostItemDetailHeaderComponent,

    PostCommentComponent,
    YoutubeVideoCellComponent,

    /* Pages */
    PostCommunityListComponent,
    PostCommunityItemDetailComponent,

    PostMusicListComponent,
    PostMusicItemDetailComponent,

    PostVideoListComponent,
    PostVideoItemDetailComponent,
  ],
  exports: [
    PostListItemComponent,
    PostMusicComponent,
  ]
})
export class PostModule {

}
