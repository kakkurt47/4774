import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare const jQuery;

@Component({
  selector: 'app-intro-navbar',
  templateUrl: './intro-navbar.component.html',
  styleUrls: ['./intro-navbar.component.scss']
})
export class IntroNavbarComponent extends BaseComponent {
  lang: string;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private router: Router,
              private translateService: TranslateService) {
    super();
  }

  moveToTop() {
    jQuery('html, body').stop().animate({ scrollTop: 0 }, 1000);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const vm = this;
      jQuery('#navbarCollapse ul li a[href^=\'#\']').on('click', function(e) {

        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        const hash = this.hash;

        if (!jQuery(hash).offset()) {
          vm.router.navigateByUrl('/');
        }

        jQuery('.navbar-toggler').removeClass('collapsed');
        jQuery('.navbar-collapse').removeClass('show');

        // animate
        jQuery('html, body').stop().animate({
          scrollTop: jQuery(hash).offset().top - 40
        }, 1000, () => {
        });
      });

      jQuery(window).scroll(() => {
        if (this.router.url !== '/airdrop-event') {
          const scroll = jQuery(window).scrollTop();
          if (scroll >= 50) {
            jQuery('.sticky').addClass('nav-sticky');
          } else {
            jQuery('.sticky').removeClass('nav-sticky');
          }
        } else {
          jQuery('.sticky').addClass('nav-sticky');
        }
      });

    }
  }

  ngOnInit() {
    this.lang = this.translateService.currentLang;

    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.lang = this.translateService.currentLang;
      })
    );
  }

  changeLang(lang: 'en' | 'ko' | 'zh') {
    this.translateService.use(lang);
  }
}
