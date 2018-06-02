/* GENERATED BY TYPECHAIN VER. 0.1.5-remake */
/* tslint:disable */
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Provider } from '@angular/core';
import { ExtendedWeb3 } from '../web3.provider';

import { Dispatcher, createTruffleDispatcher } from './interface/Dispatcher';
import { MuzikaCoin, createTruffleMuzikaCoin } from './interface/MuzikaCoin';
import { MuzikaLoyaltyPoint, createTruffleMuzikaLoyaltyPoint } from './interface/MuzikaLoyaltyPoint';
import { MuzikaPaperContract, createTruffleMuzikaPaperContract } from './interface/MuzikaPaperContract';

export { Dispatcher, IDispatcher } from './interface/Dispatcher';
export { MuzikaCoin, IMuzikaCoin } from './interface/MuzikaCoin';
export { MuzikaLoyaltyPoint, IMuzikaLoyaltyPoint } from './interface/MuzikaLoyaltyPoint';
export { MuzikaPaperContract, IMuzikaPaperContract } from './interface/MuzikaPaperContract'


export const DispatcherProviderFactory = (web3: ExtendedWeb3, platformId: string) => {
  if (isPlatformBrowser(platformId)) {
    const contract: Dispatcher = createTruffleDispatcher();
    web3.onProviderChange().subscribe(provider => {
      if (!!provider) {
        contract.setProvider(provider);
      }
    });
    return contract;
  }
};

export const MuzikaCoinProviderFactory = (web3: ExtendedWeb3, platformId: string) => {
  if (isPlatformBrowser(platformId)) {
    const contract: MuzikaCoin = createTruffleMuzikaCoin();
    web3.onProviderChange().subscribe(provider => {
      if (!!provider) {
        contract.setProvider(provider);
      }
    });
    return contract;
  }
};

export const MuzikaLoyaltyPointProviderFactory = (web3: ExtendedWeb3, platformId: string) => {
  if (isPlatformBrowser(platformId)) {
    const contract: MuzikaLoyaltyPoint = createTruffleMuzikaLoyaltyPoint();
    web3.onProviderChange().subscribe(provider => {
      if (!!provider) {
        contract.setProvider(provider);
      }
    });
    return contract;
  }
};

export const MuzikaPaperContractProviderFactory = (web3: ExtendedWeb3, platformId: string) => {
  if (isPlatformBrowser(platformId)) {
    const contract: MuzikaPaperContract = createTruffleMuzikaPaperContract();
    web3.onProviderChange().subscribe(provider => {
      if (!!provider) {
        contract.setProvider(provider);
      }
    });
    return contract;
  }
};

export const ContractProviders: Provider[] = [
  { provide: Dispatcher, useFactory: DispatcherProviderFactory, deps: [ExtendedWeb3, PLATFORM_ID] },
  { provide: MuzikaCoin, useFactory: MuzikaCoinProviderFactory, deps: [ExtendedWeb3, PLATFORM_ID] },
  { provide: MuzikaLoyaltyPoint, useFactory: MuzikaLoyaltyPointProviderFactory, deps: [ExtendedWeb3, PLATFORM_ID] },
  { provide: MuzikaPaperContract, useFactory: MuzikaPaperContractProviderFactory, deps: [ExtendedWeb3, PLATFORM_ID] }
];
