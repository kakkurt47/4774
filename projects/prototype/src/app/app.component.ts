import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BaseComponent} from '@muzika/core';
import {routerTransition} from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent extends BaseComponent {
  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
