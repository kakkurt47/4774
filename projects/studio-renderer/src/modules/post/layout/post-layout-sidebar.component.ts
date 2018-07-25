import { Component } from '@angular/core';


@Component({
  selector: 'mzk-post-layout-sidebar',
  template: `
    <ul>
      <li>
        <h4 class="sidebar-branding">Artist Studio</h4>
      </li>
      <li>
        <a>
          <span class="fas fa-coins fa-2x align-middle"></span>
          <span class="text">MZK Coins Revenue</span>
        </a>
      </li>
      <li>
        <a>
          <span class="fas fa-file-pdf fa-2x align-middle"></span>
          <span class="text">Sheet Music Manages</span>
          <span class="fas fa-chevron-down"></span>
        </a>
      </li>
      <li>
        <a>
          <span class="fas fa-music fa-2x align-middle"></span>
          <span class="text">Song Manages</span>
          <span class="fas fa-chevron-down"></span>
        </a>
      </li>
      <li>
        <a>
          <span class="fas fa-users fa-2x align-middle"></span>
          <span class="text">Community</span>
          <span class="fas fa-chevron-down"></span>
        </a>
      </li>
      <li>
        <a>
          <span class="fas fa-chart-bar fa-2x align-middle"></span>
          <span class="text">User Analyze</span>
          <span class="fas fa-chevron-down"></span>
        </a>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
      font-size: 13px;
      width: 225px;
      background: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    }

    ul {
      margin: 14px 0;
      padding: 0;
    }

    .sidebar-branding {
      padding: 3px 0 6px 17px;
      color: #18b76f;
      font-size: 13px;
      font-weight: 500;
    }

    a {
      display: block;
      position: relative;
      cursor: pointer;
      font-size: 11px;
      line-height: 11px;
      padding: 13px 17px 13px 14px;
      box-sizing: border-box;
      height: 50px;
    }

    a span.text {
      position: absolute;
      top: 18px;
      left: 55px;
    }

    a:hover {
      background: #f6f6f6;
      text-decoration: none;
    }
    
    .fa-chevron-down {
      position: absolute;
      right: 18px;
      top: 20px;
    }
  `]
})
export class PostLayoutSidebarComponent {

}
