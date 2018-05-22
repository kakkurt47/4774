import {EnvironmentType} from './env_types';

export const environmentDev: EnvironmentType = {
  production: false,
  env: 'dev',
  infuraAccessToken: '',
  rpcUrl: 'http://localhost:8545',
  networkId: 5777,
};
