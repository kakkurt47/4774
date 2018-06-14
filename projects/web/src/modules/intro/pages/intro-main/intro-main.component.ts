import {isPlatformBrowser} from '@angular/common';
import {Component, PLATFORM_ID, Inject, AfterViewInit} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';
import * as particleConfig from './particles.json';

declare const particlesJS, jQuery;

@Component({
  selector: 'app-intro-main',
  templateUrl: './intro-main.component.html',
  styleUrls: [
    '../../scss/cta.scss',
    '../../scss/helper.scss',
    './intro-main.component.scss'
  ]
})
export class IntroMainPageComponent extends BaseComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery('#navbarCollapse').scrollspy({
        offset: 70
      });

      jQuery(window).scroll(function() {
        const scroll = jQuery(window).scrollTop();

        if (scroll >= 50) {
          jQuery('.sticky').addClass('nav-sticky');
        } else {
          jQuery('.sticky').removeClass('nav-sticky');
        }
      });

    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS('home', particleConfig, () => {
        console.log('callback - particles.js config loaded');
      });
    }
  }
}
