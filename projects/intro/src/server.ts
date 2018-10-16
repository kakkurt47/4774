import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as LRU from 'lru-cache';

const path = require('path');
const cors = require('cors');

const domino = require('domino');
const fs = require('fs');
const xhr = require('xhr2');

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.

const pwd = (process.env.exec_mode === 'cluster') ? './' : path.join(__dirname);

const template = fs.readFileSync(path.join(pwd, 'index.html')).toString();

const win = domino.createWindow(template);

// global[ 'window' ] = win[ 'window' ];
// global[ 'Node' ] = win[ 'Node' ];
// global[ 'navigator' ] = win.navigator;
// global[ 'document' ] = win.document;
// global[ 'EventTarget' ] = null;
// global[ 'XMLHttpRequest' ] = xhr.XMLHttpRequest;

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../../dist/intro/server/main');

enableProdMode();

const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 18081;
const host = process.env.HOST || 'localhost';
const baseUrl = `http://${host}:${port}`;

const microCache = LRU({
  max: 500,
  maxAge: 2000 // Important: entries expires after 2 second.
});

// Set the engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');

app.set('views', pwd);

app.use(cors());

app.use('/', express.static(pwd, { index: false }));

app.get('/alive', (req, res) => {
  res.status(200).send('alive');
});

if (process.env.MUZIKA_ENV === 'stage') {
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.status(200).send('User-agent: * \nDisallow: /');
  });
}

const routes = [
  '/*'
];

const isCacheable = req => {
  // implement logic to check if the request is user-specific.
  // only non-user-specific pages are cache-able
  if (req.url.indexOf('/board/') !== -1) {
    return true;
  }
  return false;
};

const re = new RegExp('<title>(.*?)</title>', 'i');
routes.forEach(route => {
  const responseFunc = (req, res) => {
    const cacheable = isCacheable(req);
    const cacheKey = req.url.replace('?_escaped_fragment_=', '').replace('&_escaped_fragment_=', '');
    if (cacheable) {
      const hit = microCache.get(cacheKey);
      if (hit) {
        console.log(req.url, 'cache hit');
        return res.status(200).send(hit);
      }
    }

    res.render('index', { req, res }, (err, html) => {
      if (!res.headersSent) {
        res.status(html ? 200 : 500).send(html || err.message);
      }
      if (html) {
        if (cacheable) {
          microCache.set(cacheKey, html);
        }
        const regex = html.match(re);
        console.log(req.url, (regex ? regex[ 1 ] : 'Failed to extract title'), req.headers[ 'user-agent' ], err);
      } else {
        console.log(req.url, '500 Error', req.headers[ 'user-agent' ], err);
      }
    });
  };
  app.all(route, responseFunc);
});

// Main 서버일 때는 배포
if (process.env.exec_mode === 'cluster' || process.env.ENV === 'local') {
  app.listen(port, () => {
    console.log(`Listening at ${baseUrl}`);
  });
}

export default app;
