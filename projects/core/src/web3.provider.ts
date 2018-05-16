import {Provider as Web3Provider} from '@0xproject/types';
import {InjectionToken, Provider} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as Web3 from 'web3';

export class ExtendedWeb3 extends Web3 {
  private _providerChange: Subject<Web3Provider> = new BehaviorSubject<Web3Provider>(null);

  public constructor(provider?: Provider) {
    super(provider);
  }

  public setProvider(provider: Web3Provider): void {
    const currentProvider = (<any>this).currentProvider;
    currentProvider && currentProvider.stop && currentProvider.stop();

    super.setProvider(provider);
    this._providerChange.next(provider);
  }

  public onProviderChange(): Observable<Web3Provider> {
    return this._providerChange.asObservable();
  }
}

export const WEB3 = new InjectionToken<Web3>('Web3');

export const LocalWeb3ProviderFactory = () => new ExtendedWeb3(null);

export const LocalWeb3Provider: Provider = {
  provide: WEB3,
  useFactory: LocalWeb3ProviderFactory
};
