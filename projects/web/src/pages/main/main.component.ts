import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, CommunityPost, ExtendedWeb3, MuzikaCoin, SheetPost, unitUp, User} from '@muzika/core';
import {Observable, combineLatest, from} from 'rxjs';
import {BestPostsMock, SheetPostsMock} from '../../mock/posts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
