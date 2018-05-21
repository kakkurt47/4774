import {ModuleWithProviders, NgModule} from '@angular/core';
import {ContractProviders} from './contracts';
import {environmentDev} from './environments/environment';
import {environmentProd} from './environments/environment.prod';
import {environmentStage} from './environments/environment.stage';
import {EnvironmentToken} from './types/environment';
import {MuzikaWeb3Service} from './web3.service';
import {IpfsService} from './services/ipfs.service';

@NgModule({
  providers: [
    MuzikaWeb3Service,
    IpfsService,
    ...ContractProviders
  ]
})
export class MuzikaCoreModule {
  static forRoot(environmentType: string): ModuleWithProviders {
    const environment = {
      dev: environmentDev,
      stage: environmentStage,
      prod: environmentProd
    }[environmentType] || environmentDev;

    return {
      ngModule: MuzikaCoreModule,
      providers: [
        {
          provide: EnvironmentToken,
          useValue: environment
        },
        {
          provide: 'RPC_URL',
          useValue: `${environment.rpcUrl}/${environment.infuraAccessToken}`
        }
      ]
    };
  }
}
