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
      <div class="row">
        <div class="col-5">
          <img src="assets/images/business-preview.png" class="img-fluid">
        </div>
        <div class="col-7">
          
        </div>
      </div>
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
