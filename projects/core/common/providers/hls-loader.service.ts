import * as Hls from 'hls.js';
import {Block} from '../models/block';

export class MuzikaHLSLoader extends Hls.DefaultConfig.loader {
  fileName: string;
  ipfsHash: any;
  cipherKey: Buffer;
  stats: any;

  private context: any;
  private config: any;
  private callbacks: any;
  private retryDelay: any;

  constructor(config) {
    super(config);
    this.ipfsHash = config.ipfsHash;
    this.fileName = config.fileName;
    this.cipherKey = config.cipherKey || null;
  }

  destory() {
  }

  abort() {
  }

  load(context, config, callbacks) {
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.stats = {trequest: performance.now(), retry: 0};
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  }

  loadInternal() {
    const stats = this.stats;
    const context = this.context;
    const config = this.config;
    const callbacks = this.callbacks;

    stats.tfirst = Math.max(performance.now(), stats.trequest);
    stats.loaded = 0;

    const urlParts = context.url.split('/');
    const streamFilename = urlParts[urlParts.length - 1];
    // context.url = `https://ipfs.io/ipfs/${this.ipfsURL}/${filename}`;

    this._getFile(this.ipfsHash, this.fileName, streamFilename, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      let data, len;
      if (context.responseType === 'arraybuffer') {
        data = res;
        len = res.length;
      } else {
        data = buf2str(res);
        len = data.length;
      }

      // stats.loaded = stats.total = len;
      // stats.tload = Math.max(stats.tfirst, performance.now());
      const response = {url: context.url, data: data};
      callbacks.onSuccess(response, stats, context);
    });
  }

  private _getFile(ipfsHash, filename, streamingFileName, callback) {
    const nameAppend = (this.cipherKey) ? '.encrypted' : '';

    if (!callback) {
      callback = (err, res) => {
      };
    }

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.responseType = 'arraybuffer';

    xmlHttpRequest.onreadystatechange = () => {
      if (xmlHttpRequest.readyState === 4) {
        // if completely download the data
        if (xmlHttpRequest.status === 200) {
          if (this.cipherKey) {
            const encryptedBlock = Block.fromEncryptedData(xmlHttpRequest.response, this.cipherKey);
            encryptedBlock.decrypt();
            callback(null, encryptedBlock.data);
          } else {
            callback(null, xmlHttpRequest.response);
          }
        } else {
          callback(new Error('Failed to response'));
        }
      } else {
      }
    };

    console.log('GET FILE', `${ipfsHash}/streaming/${filename}/${streamingFileName}${nameAppend}`);

    xmlHttpRequest.open(
      'GET',
      `https://ipfs.io/ipfs/${ipfsHash}/streaming/${filename}/${streamingFileName}${nameAppend}`,
      true
    );
    xmlHttpRequest.send(null);
  }
}

function buf2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
