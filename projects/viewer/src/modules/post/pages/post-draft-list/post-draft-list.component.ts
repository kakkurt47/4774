import {Component, Injector} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BasePost, BasePostDraft, CommunityPost, VideoPost} from '@muzika/core';
import {BaseComponent, PostActions, UserActions} from '@muzika/core/angular';
import {AlertifyInstnace} from '@muzika/core/browser';
import {FroalaEditorOptions} from '../../post.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {select} from '@angular-redux/store';


@Component({
  selector: 'app-post-draft-list',
  templateUrl: './post-draft-list.component.html',
  styleUrls: [
    './post-draft-list.component.scss'
  ]
})
export class PostDraftListComponent extends BaseComponent {
  options = FroalaEditorOptions;
  boardType: string;

  drafts: {
    [draftId: string]: BasePostDraft
  };

  private _router: Router;

  constructor(injector: Injector,
              private _route: ActivatedRoute,
              private _postActions: PostActions) {
    super();
    this._router = injector.get(Router);
  }

  ngOnInit() {
    super.ngOnInit();

    this._sub.push(
      UserActions.currentUserObs
        .subscribe(user => {
          if (!user) {
            this._router.navigateByUrl('/login', {
              queryParams: {
                redirectTo: this._router.url
              }
            });
          }
        })
    );

    // this._sub.push(
    //   this.test.subscribe(data => console.log(data))
    // );

    this._sub.push(
      this._route.params.subscribe((params) => {
        const draftObs = this._postActions.obs[params.type];
        this.boardType = params.type;

        if (draftObs) {
          this._sub.push(
            draftObs.subscribe(drafts => {
              this.drafts = drafts;
              console.log(this.boardType, this.drafts);
            })
          );
        }

        this._postActions.loadPostDrafts(this.boardType);
      })
    );
  }

  openPostDraft(draftId: string) {
    this._router.navigate([`/board/${this.boardType}/write`], {
      queryParams: {
        id: draftId
      }
    });
  }
}
