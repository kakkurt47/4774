import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponent } from '../models/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    super();
  }
}
