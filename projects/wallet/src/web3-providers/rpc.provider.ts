import {environment} from '../environments/environment';
import * as Web3 from 'web3';

export const RPCProvider = () => {
  return new Web3.providers.HttpProvider(`http://${environment.rpc.host}:${environment.rpc.port}`)
};
