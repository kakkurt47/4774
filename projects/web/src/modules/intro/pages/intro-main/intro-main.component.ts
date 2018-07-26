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
  winDownloadURL: string;
  linuxDownloadURL: string;

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
    // jQuery
    //   .getJSON('https://release.muzika.network/studio/darwin/latest-mac.json')
    //   .then(macInfo => {
    //     console.log(macInfo);
    //     if (macInfo && macInfo.url) {
    //       this.macDownloadURL = macInfo.url;
    //     }
    //   });
    this.macDownloadURL = 'https://s3.amazonaws.com/muzika-release/studio/darwin/Muzika-0.0.9-mac.zip';
    this.linuxDownloadURL = 'https://release.muzika.network/studio/linux/muzika-0.0.9-x86_64.AppImage';
    this.winDownloadURL = 'https://s3.amazonaws.com/muzika-release/studio/win-x64/Muzika+Setup+0.0.9.exe';
  }
}
