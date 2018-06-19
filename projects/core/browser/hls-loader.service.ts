import { Block } from '@muzika/core';
import * as Hls from 'hls.js';

export class MuzikaHLSLoader extends Hls.DefaultConfig.loader {
  fileName: string;
  ipfsHash: any;
  cipherKey: Buffer;
  stats: any;

  private context: any;
  private config: any;
  private callbacks: any;
  private retryDelay: any;
  private retryTimeout: any;
  private requestTimeout: any;
  private xhrSetup: any;

  constructor(config) {
    super(config);
    this.ipfsHash = config.ipfsHash;
    this.fileName = config.fileName;
    this.cipherKey = config.cipherKey || null;
  }

  destroy() {
    super.destroy();
  }

  abort() {
    super.abort();
  }

  load(context, config, callbacks) {
    this.context = Object.assign(context, {
      responseType: 'arraybuffer'
    });
    this.config = config;
    this.callbacks = callbacks;
    console.log(callbacks);
    this.stats = { trequest: performance.now(), retry: 0 };
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  }

  loadInternal() {
    const context = this.context;
    const urlParts = context.url.split('/');
    const streamFilename = urlParts[urlParts.length - 1];
    const nameAppend = (this.cipherKey) ? '.encrypted' : '';

    context.url = `https://ipfs.io/ipfs/${this.ipfsHash}/streaming/${this.fileName}/${streamFilename}${nameAppend}`;

    super.loadInternal();
  }


  readystatechange(event) {
    const xhr = event.currentTarget,
      readyState = xhr.readyState,
      stats = this.stats,
      context = this.context,
      config = this.config;

    // don't proceed if xhr has been aborted
    if (stats.aborted) {
      return;
    }

    // >= HEADERS_RECEIVED
    if (readyState >= 2) {
      // clear xhr timeout and rearm it if readyState less than 4
      window.clearTimeout(this.requestTimeout);
      if (stats.tfirst === 0) {
        stats.tfirst = Math.max(performance.now(), stats.trequest);
      }

      if (readyState === 4) {
        const status = xhr.status;
        // http status between 200 to 299 are all successful
        if (status >= 200 && status < 300) {
          stats.tload = Math.max(stats.tfirst, performance.now());

          let data, len;
          if (this.cipherKey) {
            const encryptedBlock = Block.fromEncryptedData(xhr.response, this.cipherKey);
            encryptedBlock.decrypt();
            data = encryptedBlock.data;
            len = data.length;
          } else {
            data = buf2str(xhr.response);
            len = data.length;
          }
          stats.loaded = stats.total = len;
          const response = { url: this.context.url, data: data };
          console.log(xhr, response, context, this);
          this.callbacks.onSuccess(response, stats, context, xhr);
        } else {
          // if max nb of retries reached or if http status between 400 and 499
          // (such error cannot be recovered, retrying is useless), return error
          if (stats.retry >= config.maxRetry || (status >= 400 && status < 499)) {
            console.error(`${status} while loading ${context.url}`);
            this.callbacks.onError({ code: status, text: xhr.statusText }, context, xhr);
          } else {
            // retry
            console.warn(`${status} while loading ${context.url}, retrying in ${this.retryDelay}...`);
            // aborts and resets internal state
            this.destroy();
            // schedule retry
            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay);
            // set exponential backoff
            this.retryDelay = Math.min(2 * this.retryDelay, config.maxRetryDelay);
            stats.retry++;
          }
        }
      } else {
        // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), config.timeout);
      }
    }
  }

  //
  // private _getFile(ipfsHash, filename, streamingFileName) {
  //
  //   const xhr = new XMLHttpRequest();
  //
  //   console.log('GET FILE', `${ipfsHash}/streaming/${filename}/${streamingFileName}${nameAppend}`);
  //   xhr.open(
  //     'GET',
  //     `https://ipfs.io/ipfs/${ipfsHash}/streaming/${filename}/${streamingFileName}${nameAppend}`,
  //     true
  //   );
  //   xhr.responseType = 'arraybuffer';
  //
  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === 4) {
  //       // if completely download the data
  //       const status = xhr.status;
  //       let data;
  //       if (status >= 200 && status < 300) {
  //         if (this.cipherKey) {
  //           const encryptedBlock = Block.fromEncryptedData(xhr.response, this.cipherKey);
  //           encryptedBlock.decrypt();
  //           data = encryptedBlock.data;
  //         } else {
  //           data = xhr.response;
  //         }
  //         const response = { url: this.context.url, data };
  //         this.callbacks.onSuccess(response, this.stats, this.context);
  //       } else {
  //         // if max nb of retries reached or if http status between 400 and 499 (such error cannot be recovered, retrying is useless), return error
  //         if (this.stats.retry >= this.config.maxRetry || (status >= 400 && status < 499)) {
  //           console.error(`${status} while loading`);
  //           this.callbacks.onError({ code: status, text: xhr.statusText }, this.context, xhr);
  //         } else {
  //           // retry
  //           // aborts and resets internal state
  //           this.destroy();
  //           // schedule retry
  //           this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay);
  //           // set exponential backoff
  //           this.retryDelay = Math.min(2 * this.retryDelay, this.config.maxRetryDelay);
  //           this.stats.retry++;
  //         }
  //
  //         callback(new Error('Failed to response'));
  //       }
  //     } else {
  //     }
  //   };
  //
  //   // setup timeout before we perform request
  //   this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout);
  //   xhr.send(null);
  // }
  //
  loadtimeout() {
    super.loadtimeout();
  }
}

function buf2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
