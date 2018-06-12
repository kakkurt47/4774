import {isPlatformBrowser} from '@angular/common';
import {Component, PLATFORM_ID, Inject} from '@angular/core';
import {BaseComponent} from '@muzika/core';
import * as particleConfig from './particles.json';

declare const particlesJS;

@Component({
  selector: 'app-intro-main',
  templateUrl: './intro-main.component.html',
  styleUrls: [
    './scss/cta.scss',
    './scss/helper.scss',
    './intro-main.component.scss'
  ]
})
export class IntroMainPageComponent extends BaseComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(particleConfig);
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS('home', particleConfig, () => {
        console.log('callback - particles.js config loaded');
      });
    }
  }
}
