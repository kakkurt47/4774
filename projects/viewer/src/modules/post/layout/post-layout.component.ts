import { Component } from '@angular/core';


@Component({
  selector: 'mzk-post-layout',
  template: `
    <div class="container">
      <div class="row">
        <mzk-post-layout-sidebar></mzk-post-layout-sidebar>
        <div class="col">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #EEEEEE;
      padding: 10px 0;
      min-height: 100%;
    }
  `]
})
export class PostLayoutComponent {
}
