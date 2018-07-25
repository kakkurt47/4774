import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare const jQuery;

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
  macDownloadURL: string;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private http: HttpClient) {
    super();
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery('#navbarCollapse ul li a[href^=\'#\']').on('click', function(e) {

        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        const hash = this.hash;

        jQuery('.navbar-toggler').removeClass('collapsed');
        jQuery('.navbar-collapse').removeClass('show');

        // animate
        jQuery('html, body').stop().animate({
          scrollTop: jQuery(hash).offset().top - 40
        }, 1000, () => {
        });
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
    this._sub.push(
      forkJoin(
        this.http.get('https://release.muzika.network/studio/darwin/latest-mac.json')
      ).subscribe(([macInfo]: [{
        version: string,
        releaseDate: string,
        url: string
      }]) => {
        if (macInfo && macInfo.url) {
          this.macDownloadURL = macInfo.url;
        }
        console.log(macInfo);
      })
    );
  }
}
