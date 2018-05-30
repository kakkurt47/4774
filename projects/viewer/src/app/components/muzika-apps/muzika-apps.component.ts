import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {BaseComponent} from '@muzika/core';

@Component({
  selector: 'muzika-apps',
  templateUrl: './muzika-apps.component.html',
  styleUrls: ['./muzika-apps.component.scss']
})
export class MuzikaAppsComponent extends BaseComponent {
  @Output() tabChange: EventEmitter<'viewer' | 'wallet' | 'floating-wallet'> = new EventEmitter();
  currentTab: 'viewer' | 'wallet' | 'floating-wallet' = 'viewer';

  constructor(private router: Router,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this._sub.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // @TODO @brcps12 You should change this router url to signing url
          // (or change it to regex patterns of urls which should be shown as floating modal)
          if (event.url === '/(wallet:home)') {
            this.changeTab('floating-wallet');
          }
        }
      })
    );
  }

  changeTab(tab: 'viewer' | 'wallet' | 'floating-wallet') {
    this.currentTab = tab;
    this.tabChange.emit(tab);
  }
}
