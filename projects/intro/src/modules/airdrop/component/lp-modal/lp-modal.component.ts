import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'airdrop-lp-modal',
  template: `
    <div class="alert">
      <h5>{{message}}</h5>
      <button class="btn-custom" (click)="add()">+{{lp}} {{'airdrop.lp-add' | translate}}</button>
    </div>
  `,
  styleUrls: [
    './lp-modal.component.scss'
  ]
})
export class LpModalComponent {
  @Input() message: string;
  @Input() lp: number;

  @Output() addLP = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {
  }

  add() {
    this.addLP.next(this.lp);
    this.elementRef.nativeElement.addClass('close');
  }
}
