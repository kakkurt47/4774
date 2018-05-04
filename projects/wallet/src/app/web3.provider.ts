import {InjectionToken, Provider} from '@angular/core';
import * as Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('Web3');

export const Web3Provider: Provider = {
  provide: WEB3,
  useValue: new Web3()
};
