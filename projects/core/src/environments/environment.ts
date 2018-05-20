import {EnvironmentType} from '../types/environment';

export const environmentDev: EnvironmentType = {
  production: false,
  env: 'dev',
  infuraAccessToken: '',
  rpcUrl: 'http://localhost:8545',
  networkId: 5777,
};
