import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponent, UserActions } from '@muzika/core/angular';
import { isPlatformBrowser } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {

  constructor(private userActions: UserActions,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (isPlatformBrowser(this.platformId)) {
      this._sub.push(
        interval(20000).subscribe(() => {
          this.userActions.refreshMe().subscribe();
        })
      );
      this.userActions.refreshMe().subscribe();
    }
  }
}
