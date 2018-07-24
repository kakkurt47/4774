import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '@muzika/core/angular';
import { MuzikaTabs, TabService } from '../../providers/tab.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'muzika-apps',
  templateUrl: './muzika-apps.component.html',
  styleUrls: ['./muzika-apps.component.scss']
})
export class MuzikaAppsComponent extends BaseComponent {
  currentTab: MuzikaTabs = 'viewer';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tabService: TabService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this._sub.push(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // (or change it to regex patterns of urls which should be shown as floating modal)
          if (event.url === '/(wallet:home)') {
            // this.changeTab('floating-wallet');
          }
        })
    );
  }

  changeTab(tab: MuzikaTabs) {
    this.currentTab = tab;
    if (tab === 'wallet') {
      this.router.navigate([{ outlets: { wallet: 'home' } }]);
    } else {
      this.router.navigateByUrl('/board/sheet/draft');
    }
    this.tabService.changeTab(tab);
  }
}
