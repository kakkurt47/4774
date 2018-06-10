import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, CommunityPost, ExtendedWeb3, MuzikaCoin, MusicPost, unitUp, User} from '@muzika/core';
import {Observable, combineLatest, from} from 'rxjs';
import {BestPostsMock, MusicPostsMock} from '../../mock/posts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intro-main',
  templateUrl: './intro-main.component.html',
  styleUrls: ['./intro-main.component.scss']
})
export class IntroMainPageComponent extends BaseComponent {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
