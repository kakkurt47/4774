import { Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
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
  @Input()
  stickOnTop = false;

  lang: string;

  /* Jquery Instances */
  rootInstance: any;
  stickyInstance: any;
  navItemsInstance: any;
  navbarTogglerInstance: any;
  navbarCollapseInstance: any;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private elementRef: ElementRef,
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

      this.rootInstance = jQuery(this.elementRef.nativeElement);
      this.stickyInstance = this.rootInstance.find('.sticky');
      this.navItemsInstance = this.rootInstance.find(`#navbarCollapse ul li a[href^='#']`);
      this.navbarTogglerInstance = this.rootInstance.find('.navbar-toggler');
      this.navbarCollapseInstance = this.rootInstance.find('.navbar-collapse');

      if (this.stickOnTop) {
        this.stickyInstance.addClass('nav-sticky');
      }

      this.navItemsInstance.on('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        const hash = this.hash;

        if (!jQuery(hash).offset()) {
          vm.router.navigateByUrl('/');
        }

        vm.navbarTogglerInstance.removeClass('collapsed');
        vm.navbarCollapseInstance.removeClass('show');

        // animate
        jQuery('html, body').stop().animate({
          scrollTop: jQuery(hash).offset().top - 40
        }, 1000, () => {
        });
      });
    }
  }

  @HostListener('window:scroll')
  private onWindowScroll() {
    if (this.stickyInstance && !this.stickOnTop) {
      const scroll = jQuery(window).scrollTop();
      if (scroll >= 50) {
        this.stickyInstance.addClass('nav-sticky');
      } else {
        this.stickyInstance.removeClass('nav-sticky');
      }
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

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.navItemsInstance) {
      this.navItemsInstance.off('click');
    }
  }
}
