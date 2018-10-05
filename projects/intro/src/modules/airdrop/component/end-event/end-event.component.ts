import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AirdropApi } from '../../airdrop-api';

@Component({
  selector: 'airdrop-end-event',
  template: `
    <div class="content-wrapper">
      <div class="content">
        <h3> {{'airdrop.end-event.title' | translate}} </h3>
        
        <p class="mt-3">
          <span [innerHtml]="'airdrop.end-event.content-1' | translate | nl2br"></span><br>
          <span [innerHtml]="'airdrop.end-event.content-2' | translate | nl2br"></span>
        </p>
        
        <div class="row w-100 mx-auto">
          <div class="col-md-4 mt-4">
            <a href="https://t.me/muzika_english"><i class="fab fa-telegram"></i> {{'intro-footer.telegram-en' | translate}}</a>
          </div>
          <div class="col-md-4 mt-4">
            <a href="https://t.me/muzika_chinese"><i class="fab fa-telegram"></i> {{'intro-footer.telegram-zh' | translate}}</a>
          </div>
          <div class="col-md-4 mt-4">
            <a href="https://t.me/muzika_korean"><i class="fab fa-telegram"></i> {{'intro-footer.telegram-kr' | translate}}</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    '../content.component.scss',
    './end-event.component.scss'
  ]
})
export class AirdropEndEventComponent implements OnInit {
  ngOnInit() {
  }
}
