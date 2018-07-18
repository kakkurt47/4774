import {Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';

@Component({
  selector: 'web-main',
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
