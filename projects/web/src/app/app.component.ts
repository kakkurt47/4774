import {isPlatformBrowser} from '@angular/common';
import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core';
import {interval} from 'rxjs';

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
