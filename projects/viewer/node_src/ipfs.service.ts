import * as IPFS from 'ipfs';
import {Observable, throwError} from 'rxjs';

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
            '/ip4/0.0.0.0/tcp/4004/ws'
          ]
        },
        Swarm: {
          DisableRelay: false,
          EnableRelayHop: true
        }
      }
    });

    // if ipfs node generated, connect to a remote storage for speeding up file exchange.
    this.node.on('ready', () => {
      this.node.swarm.connect(this.remoteStorage, (err) => {
        if (err) {
          console.log(err);
        }

        this.isReady = true;
      });
    });
  }

  sub(arg) {
    return Observable.create(observer => {
      this.node.pubsub.subscribe(arg, {discover: true}, (msg) => {
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
            throw throwError('Failed to upload file to IPFS');
          }
          observer.next(result);
          observer.complete();
        });
      } catch (e) {
        throw throwError(e);
      }
    });
  }

  get(hash) {
    return Observable.create(observer => {
      try {
        this.node.files.get(hash, (err, files) => {
          if (err) {
            throw throwError('Not found');
          }
          observer.next(files);
          observer.complete();
        });
      } catch (e) {
        throw throwError(e);
      }
    });
  }
}

export const IpfsServiceInstance = new IpfsService();
