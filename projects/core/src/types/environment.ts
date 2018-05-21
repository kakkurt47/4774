import {InjectionToken} from '@angular/core';

export interface EnvironmentType {
  production: boolean;
  env: 'dev' | 'prod' | 'stage';
  infuraAccessToken: string;
  rpcUrl: string;
  networkId: number;
}

export const EnvironmentToken = new InjectionToken<EnvironmentType>('MuzikaEnvironment');
