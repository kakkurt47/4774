import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-ecosystem',
  template: `
    <section class="section" id="ecosystem">
      <div class="container">
        <h2 class="text-left intro-section-title">
          THE MUZIKA ECOSYSTEM
        </h2>
        <p class="text-left intro-section-subtitle pt-4">
          Muzika's core concept is that of an autonomous, <BR />
          self-sustaining ecosystem driven by content creators (music artists), and their fans in tandem. 
          Prior to the advent of blockchain technology in 2009 with the release of Bitcoin, 
          such a revolutionary technology to drive such evolution of the music industry remained out of the world's grasp.
          <BR /><BR />
          With the creation of a new decentralized digital music ecosystem where anyone can participate in the production, 
          exchange, investment, consumption, and distribution cycle of the music industry, Muzika will realize its goal of revolution.
        </p>
      </div>
    </section>
  `,
  styles: [`
    section {
      display: block;
      background-color: #47637c;
      padding: 100px 0;
    }
    .intro-section-title {
      color: white;
    }
    .intro-section-subtitle {
      max-width: 560px;
      color: #e2dfde;
    }
  `]
})
export class MzkIntroEcosystemComponent extends BaseComponent {
  constructor() {
    super();
  }


}
