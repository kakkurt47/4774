import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
    <div class="triangle-down"></div>
    <section class="section" id="ecosystem">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <h2 class="text-left intro-section-title">
              THE MUZIKA ECOSYSTEM
            </h2>
            <p class="text-left intro-section-subtitle pt-4">
              Muzika's core concept is that of an autonomous, <BR/>
              self-sustaining ecosystem driven by content creators (music artists), and their fans in tandem.
              Prior to the advent of blockchain technology in 2009 with the release of Bitcoin,
              such a revolutionary technology to drive such evolution of the music industry remained out of the world's grasp.
              <BR/><BR/>
              With the creation of a new decentralized digital music ecosystem where anyone can participate in the production,
              exchange, investment, consumption, and distribution cycle of the music industry, Muzika will realize its goal of revolution.
            </p>
          </div>
          <div class="col-5">
            <img src="assets/images/diagram-ecosystem.png" class="img-fluid ml-5">
          </div>
        </div>
      </div>
    </section>
    <div class="triangle-down triangle-bottom"></div>
  `,
  styles: [`    
    .triangle-down {
      width: 100%;
      height: 0;
      border-left: 50vw solid transparent;
      border-right: 50vw solid transparent;

      border-top: 100px solid white;
      background-color: #47637c;
    }
    
    .triangle-bottom {
      border-top-color: #47637c;
      background-color: #35495e;
    } 

    section {
      display: block;
      background-color: #47637c;
      padding: 100px 0 60px 0;
    }

    .intro-section-title {
      color: white;
    }

    .intro-section-subtitle {
      color: #e2dfde;
    }
  `]
})
export class MzkIntroEcosystemComponent extends BaseComponent {
  constructor() {
    super();
  }


}
