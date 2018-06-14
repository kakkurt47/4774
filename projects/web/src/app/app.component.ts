import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
