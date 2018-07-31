import { Component, Input } from '@angular/core';


@Component({
  selector: 'airdrop-breadcrumb',
  template: `
    <div class="horizontal-line">
      <div class="step one">
        <div class="circle"></div>
        <div class="vertical-line"></div>
        <div class="head">
          {{'airdrop.breadcrumb.step-1' | translate}}
        </div>

        <div class="spinner" *ngIf="current == 1">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div class="step two">
        <div class="circle"></div>
        <div class="vertical-line"></div>
        <div class="head">
          {{'airdrop.breadcrumb.step-2' | translate}}
        </div>

        <div class="spinner" *ngIf="current == 2">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div class="step three">
        <div class="circle"></div>
        <div class="vertical-line"></div>
        <div class="head">
          {{'airdrop.breadcrumb.step-3' | translate}}
        </div>

        <div class="spinner" *ngIf="current == 3">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    './breadcrumb.component.scss'
  ]
})
export class AirdropBreadcrumbComponent {
  @Input() current = 1;
}
