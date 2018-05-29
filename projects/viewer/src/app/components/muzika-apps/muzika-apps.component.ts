import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'muzika-apps',
  templateUrl: './muzika-apps.component.html',
  styleUrls: ['./muzika-apps.component.scss']
})
export class MuzikaAppsComponent {
  @Output() tabChange: EventEmitter<'viewer' | 'wallet'> = new EventEmitter();
  currentTab: 'viewer' | 'wallet' = 'viewer';

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  changeTab(tab: 'viewer' | 'wallet') {
    this.currentTab = tab;
    this.tabChange.emit(tab);
  }
}
