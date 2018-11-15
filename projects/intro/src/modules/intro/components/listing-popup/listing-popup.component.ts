import { Component } from '@angular/core';


@Component({
  selector: 'mzk-listing-popup',
  templateUrl: './listing-popup.component.html',
  styleUrls: ['./listing-popup.component.scss']
})
export class ListingPopupComponent {
  isShow = true;

  open() {
    window.open('https://www.huobi.co.kr/ko-KR/notice/');
  }
}
