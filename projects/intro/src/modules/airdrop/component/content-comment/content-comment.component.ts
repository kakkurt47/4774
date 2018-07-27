import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'airdrop-content-comment',
  template: `
    <div class="input-group">
      <input type="text" class="form-control" placeholder="아티스트에게 응원 댓글 한마디 남겨주세요!">
      <span class="input-group-append">
        <button class="btn btn-custom">
          작성
        </button>
      </span>
    </div>
    <airdrop-lp-modal [class.close]="!modalOpen"
                      (addLP)="add($event)"
                      message="댓글이 작성되었습니다" lp="50"></airdrop-lp-modal>
  `,
  styleUrls: [
    './content-comment.component.scss'
  ]
})
export class AirdropContentCommentComponent {
  @Output() addLP = new EventEmitter<number>();
  modalOpen = false;

  add(lp: number) {
    this.addLP.emit(lp);
  }
}
