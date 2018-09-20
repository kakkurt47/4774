import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../../../../models/base.component';

declare const jQuery;

@Component({
  selector: 'app-intro-ecosystem',
  templateUrl: './intro-ecosystem.component.html',
  styleUrls: [
    '../../scss/cta.scss',
    '../../scss/helper.scss',
    './intro-ecosystem.component.scss'
  ]
})
export class IntroEcosystemPageComponent extends BaseComponent {
}
