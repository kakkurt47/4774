
import * as Hls from 'hls.js';


export class MuzikaHLSLoader extends Hls.DefaultConfig.loader {
  ipfsPath: any;
  stats: any;

  private context: any;
  private config: any;
  private callbacks: any;
  private retryDelay: any;

  constructor(config) {
    super(config);
    this.ipfsPath = config.ipfsPath;
  }

  destory() {
  }

  abort() {
  }

  load(context, config, callbacks) {
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.stats = { trequest: performance.now(), retry: 0 };
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
    const filename = urlParts[urlParts.length - 1];
    // context.url = `https://ipfs.io/ipfs/${this.ipfsURL}/${filename}`;

    getFile(this.ipfsPath, filename, (err, res) => {
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
      const response = { url: context.url, data: data };
      callbacks.onSuccess(response, stats, context);
    });
  }
}

function getFile(url, filename, callback) {
  if (!callback) {
    callback = (err, res) => {};
  }

  const xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.responseType = 'arraybuffer';

  xmlHttpRequest.onreadystatechange = () => {
    if (xmlHttpRequest.readyState === 4) {
      // if completely download the data
      if (xmlHttpRequest.status === 200) {
        callback(null, xmlHttpRequest.response);
      } else {
        callback(new Error('Failed to response'));
      }
    } else {
    }
  };

  xmlHttpRequest.open(
    'GET',
    `https://ipfs.io/ipfs/${url}/${filename}`,
    true
  );
  xmlHttpRequest.send(null);
}

function buf2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
