import {ModuleWithProviders, NgModule} from '@angular/core';
import {LocalWeb3Provider} from './web3.provider';
import {ContractProviders} from './contracts';

@NgModule({

})
export class MuzikaCoreModule {
  static forRoot(defaultRpcUrl?: string): ModuleWithProviders {
    return {
      ngModule: MuzikaCoreModule,
      providers: [
        LocalWeb3Provider,
        ...ContractProviders
      ]
    };
  }
}
