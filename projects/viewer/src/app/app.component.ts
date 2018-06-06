import {isPlatformBrowser} from '@angular/common';
import {Component, PLATFORM_ID, Inject, NgZone, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BaseComponent, ExtendedWeb3, UserActions} from '@muzika/core';
import {TranslateService} from '@ngx-translate/core';
import {interval} from 'rxjs';
import {environment} from '../environments/environment';
import {ElectronService} from '../providers/electron.service';
import {MuzikaWalletProvider} from '../providers/muzika-wallet.provider';
import {MuzikaTabs, TabService} from '../providers/tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements AfterViewInit {
  currentTab: MuzikaTabs = 'viewer';

  constructor(public electronService: ElectronService,
              @Inject(PLATFORM_ID) private platformId: any,
              private userActions: UserActions,
              private zone: NgZone,
              private translate: TranslateService,
              private web3: ExtendedWeb3,
              private tabService: TabService,
              private router: Router,
              private walletProvider: MuzikaWalletProvider) {
    super();
    translate.setDefaultLang('en');
    console.log('AppConfig', environment);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    super.ngOnInit();

    if (isPlatformBrowser(this.platformId)) {
      // Angular Zone Change Detection Wait 문제 해결
      this.zone.runOutsideAngular(() => {
        this._sub.push(
          interval(30000)
            .subscribe(() => {
              this.zone.run(() => this.userActions.refreshMe().subscribe());
            })
        );
        this.userActions.refreshMe().subscribe();
      });
    }

    this._sub.push(
      this.tabService.tabChange.subscribe(tab => {
        this.currentTab = tab;
      })
    );
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.web3.setProvider(this.walletProvider);
    }
  }

  closeFloating() {
    this.tabService.changeTab('viewer');
  }
}
