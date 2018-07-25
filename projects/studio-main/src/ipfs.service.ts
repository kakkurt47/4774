import * as IPFS from 'ipfs';
import * as request from 'request';
import * as path from 'path';
import { Observable } from 'rxjs';
import { electronEnvironment } from './environment';
import { MuzikaConsole } from '@muzika/core';

export class IpfsService {
  node: IPFS;
  muzikaPeers: string[] = [];
  isReady = false;

  constructor() {
  }

  init(directoryPath) {
    this.node = new IPFS({
      repo: path.join(directoryPath, 'ipfs-muzika'),
      config: {
        Addresses: {
          Swarm: [
            '/ip4/0.0.0.0/tcp/4004/ws',
          ]
        },
        EXPERIMENTAL: {
          relay: {
            enabled: true,
            hop: {
              enabled: true
            }
          }
        },
        Swarm: {
          DisableRelay: false,
          EnableRelayHop: true
        }
      }
    });

    // if ipfs node generated, connect to a remote storage for speeding up file exchange.
    this.node.on('ready', () => {
      // get IPFS nodes list
      request.get({
          url: `${electronEnvironment.base_api_url}/seed/ipfs`,
          json: true
        },
        (error, response, body) => {
          if (!error) {
            for (const ipfsNode of body) {
              this.connectPeer(ipfsNode.ID)
                .then(() => {
                  MuzikaConsole.log('CONNECTED WITH MUZIKA RELAY NODE : ', ipfsNode.ID);
                  // if one of the IPFS is connected, ready status to true
                  this.muzikaPeers.push(ipfsNode.APIServer);
                  this.isReady = true;
                });
            }
          } else {
            MuzikaConsole.error('Not connected with muzika-platform-server..');
          }
        }
      );
    });
  }

  sub(arg): Promise<any> {
    return Observable.create(observer => {
      this.node.pubsub.subscribe(arg, {discover: true}, (msg) => {
        observer.next(msg.data);
      });
    });
  }

  pub(arg, msg) {
    this.node.pubsub.publish(arg, new this.node.types.Buffer(msg));
  }

  connectPeer(peer): Promise<void> {
    return this.node.swarm.connect(peer);
  }

  peers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.node._libp2pNode.on('peer:connect', peer => {
        this.node.swarm.peers()
          .then((peerInfos) => resolve(peerInfos))
          .catch(err => reject(err));
      });
    });
  }

  id(): Promise<any> {
    return this.node.id();
  }

  add(uploadQueue, options: any = {}): Promise<any> {
    return this.node.files.add(uploadQueue, options);
  }

  get(hash): Promise<void> {
    return this.node.files.get(hash);
  }

  getRandomPeer() {
    return this.muzikaPeers[Math.floor(Math.random() * this.muzikaPeers.length)];
  }
}

export const IpfsServiceInstance = new IpfsService();
