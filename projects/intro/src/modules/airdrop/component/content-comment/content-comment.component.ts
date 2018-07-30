import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AirdropApi } from '../../airdrop-api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'airdrop-content-comment',
  template: `
    <div class="input-group">
      <input type="text" [(ngModel)]="comment" class="form-control" placeholder="아티스트에게 응원 댓글 한마디 남겨주세요!">
      <span class="input-group-append">
        <button class="btn btn-custom" (click)="write()">
          작성
        </button>
      </span>
    </div>
    
    
    <div class="comment" *ngFor="let comment of comments">
      <img [src]="'assets/profile/person-' + (comment.wallet_id % 4 + 1) + '.png'" class="profile-img">
      <div class="content">
        <b>{{comment.wallet_id}} </b>

        <span class="comment-content">
            {{comment.content}}
          </span>

        <div class="comment-extra small">
          <time>{{comment.time}}</time>
        </div>
      </div>
    </div>
    
    <BR />

    <airdrop-lp-modal [class.close]="!modalOpen"
                      (addLP)="add($event)"
                      message="댓글이 작성되었습니다" lp="50"></airdrop-lp-modal>
  `,
  styleUrls: [
    './content-comment.component.scss'
  ]
})
export class AirdropContentCommentComponent implements OnInit {
  @Output() addLP = new EventEmitter<{
    lp: number,
    comment: string
  }>();
  modalOpen = false;

  comments: any[];

  @Input()
  musician: string;

  comment: string;

  constructor(private api: AirdropApi) {
  }

  write() {
    if (!this.comment || this.comment.length < 5) {
      return alert('응원 댓글은 5글자 이상 작성해주셔야합니다.');
    }
    this.modalOpen = true;
  }

  getList() {
    return this.api.get<any[]>('/comment?musician=' + this.musician)
      .pipe(map(res => {
        this.comments = res;
        return res;
      }));
  }

  add(lp: number) {
    this.addLP.emit({ lp, comment: this.comment });
  }

  ngOnInit(): void {
    this.getList().subscribe();
  }
}
