import { Injectable } from '@angular/core';
import * as IPFS from 'ipfs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class IpfsService {
  node: IPFS;

  // define remote node for promoting file exchange
  // the remote node should have webrtc-star or websocket-star address and support circuit relay.
  // reference : https://github.com/ipfs/js-ipfs/tree/master/examples/circuit-relaying
  remoteStorage = '/ip4/127.0.0.1/tcp/4004/ws/ipfs/QmdP8ATHxW1zLJ897aawkstbibRhyAXyLhDpc2STJUKqtg';
  isReady = false;

  constructor() {

  }

  init() {
    this.node = new IPFS({
      repo: 'ipfs-muzika',
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
          ]
        }
      }
    });

    // if ipfs node generated, connect to a remote storage for speeding up file exchange.
    if (this.remoteStorage) {
      this.node.on('ready', () => {
        this.node.swarm.connect(this.remoteStorage, (err) => {
          if (err) {
            console.log(err);
          }

          this.isReady = true;
        });
      });
    }
  }

  sub(arg) {
    return Observable.create(observer => {
      this.node.pubsub.subscribe(arg, { discover: true }, (msg) => {
        observer.next(msg.data);
      });
    });
  }

  pub(arg, msg) {
    this.node.pubsub.publish(arg, new this.node.types.Buffer(msg));
  }

  addresses(): Observable<Array<string>> {
    return Observable.create(observer => {
      this.node.id((err, identity) => {
        if (err) {
          throw err;
        }
        observer.next(identity.addresses);
        observer.complete();
      });
    });
  }

  connectPeer(peer) {
    this.node.swarm.connect(peer, (err) => {
      if (err) {
        console.log('Cannot connect to ' + peer);
        return;
      }
    });
  }

  peers() {
    return Observable.create(observer => {
      this.node._libp2pNode.on('peer:connect', peer => {
        this.node.swarm.peers((err, peerInfos) => {
          if (err) {
            throw err;
          }
        });
        observer.next(peer);
      });
    });
  }

  id() {
    return Observable.create(observer => {
      this.node.id((err, identity) => {
        if (err) {
          throw err;
        }
        observer.next(identity);
        observer.complete();
      });
    });
  }

  put(blob) {
    return Observable.create(observer => {
      try {
        // this.node.add();
        this.node.files.add(blob, (err, result) => {
          if (err) {
            throw Observable.throw('Failed to upload file to IPFS');
          }
          observer.next(result);
          observer.complete();
        });
      } catch (e) {
        throw Observable.throw(e);
      }
    });
  }

  get(hash) {
    return Observable.create(observer => {
      try {
        this.node.files.get(hash, (err, files) => {
          if (err) {
            throw Observable.throw('Not found');
          }
          observer.next(files);
          observer.complete();
        });
      } catch (e) {
        throw Observable.throw(e);
      }
    });
  }
}
