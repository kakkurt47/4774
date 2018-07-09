import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-business',
  template: `
    <section class="section" id="business">
      <h2 class="text-center intro-section-title">
        OUR BUSINESS
      </h2>
      <p class="text-center intro-section-subtitle">
        South Korea's largest <BR />
        music platform
      </p>
      <img src="assets/images/business-preview.png">
    </section>
  `,
  styles: [`
    
  `]
})
export class MzkIntroBusinessComponent extends BaseComponent {
  constructor() {
    super();
  }


}
