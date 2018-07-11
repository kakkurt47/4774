import { Component } from '@angular/core';
import { BaseComponent } from '@muzika/core/angular';

@Component({
  selector: 'mzk-intro-mzk-coins',
  template: `
    <section class="section" id="mzk-coins">
      <div class="container">
        <h2 class="intro-section-title">
          The MZK Coin
        </h2>
        <p class="intro-section-subtitle mt-4 mb-3">
          {{'intro-mzk-coins.subtitle-1' | translate}}<BR/> <BR/>
          {{'intro-mzk-coins.subtitle-2' | translate}}
        </p>
        <img src="assets/images/diagram-coin.png" class="mt-sm-5 img-fluid mb-sm-5">
        <BR/>
        <BR/>
        <h2 class="mt-5 text-center intro-section-title mb-5">4 MAJOR FUNCTIONS</h2>
        <div class="row">
          <div class="col-6">
            <h4 class="function-title">Community Building</h4>
            <p class="function-desc">
              In order to be truly self-sustaining, the Muzika ecosystem will contain all of the necessary activities. <BR />
              These range from creative brainstorming, crowd-funding, the exchange of feedback, and more.
            </p>
          </div>
          <div class="col-6">
            <h4 class="function-title">Commercial Items</h4>
            <p class="function-desc">
              Besides community involvement, the ecosystem will also incorporate
              all of the functions that make the traditional digital music industry otherwise successful.
              Streaming services, a sheet music marketplace, musical instruments,
              recording services and much more will all be available through Muzika.
            </p>
          </div>
          <div class="col-6">
            <h4 class="function-title">Investment and rewards</h4>
            <p class="function-desc">
              Users may invest in artists much like they might a stock in worldly capital markets,
              or rather lend to a musician to fund their project,
              much in the same way a loanholder might lend to a government or corporation.
              And just as with those more traditional modes of investment, investors in the Muzika ecosystem
              will collect dividends and/or interest according to their investment choices.
            </p>
          </div>
          <div class="col-6">
            <h4 class="function-title">Community-wide Programs</h4>
            <p class="function-desc">
              The real bread and butter of the Muzika ecosystem will be the spirit of creativity.
              Community programs and events such as auditions, contests, crowd-funding drives, live-streaming events,
              and other such activities driven by member involvement will be a focal point of Muzika.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="triangle-down"></div>
  `,
  styles: [`
    .triangle-down {
      width: 100%;
      height: 0;
      border-left: 50vw solid transparent;
      border-right: 50vw solid transparent;

      border-top: 100px solid #d5dbe0;
      background-color: #f8fafb;
    }

    section {
      background-color: #d5dbe0;
      padding: 100px 0;
    }

    @media (max-width: 768px) {
      section {
        padding: 50px 0;
      }
    }

    .intro-section-subtitle {
      color: #4d5256;
      max-width: 530px;
    }

    .function-title {
      font-size: 22px;
      text-align: center;
      padding: 15px 0;
      border-bottom: 2px solid #18b76f;
      color: #4d5256;
    }

    .function-desc {
      margin: 0 auto;
      padding: 10px 0 30px 0;
      max-width: 466px;
      font-size: 15px;
      text-align: center;
      color: #878d91;
    }
  `]
})
export class MzkIntroMZKCoinComponent extends BaseComponent {
  constructor() {
    super();
  }


}
