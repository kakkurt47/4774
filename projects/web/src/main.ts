import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import {hmrBootstrap} from './hmr';
import { MuzikaConsole } from '@muzika/core';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.env === 'dev') {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    MuzikaConsole.error('HMR is not enabled for webpack-dev-server!');
    MuzikaConsole.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap();
  });
}
