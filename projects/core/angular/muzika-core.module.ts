import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {isPlatformBrowser, isPlatformServer, CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Inject, ModuleWithProviders, NgModule, PLATFORM_ID} from '@angular/core';
import {BrowserTransferStateModule, TransferState} from '@angular/platform-browser';
import {IAppState, rootReducer, environmentProd, environmentStage, environmentDev} from '@muzika/core';
import {createStore} from 'redux';
import {CommentActions, PostActions} from './actions';
import {UserActions} from './actions/user.action';
import {PaginationComponent} from './components/pagination/pagination.component';
import {APIConfig} from './config/api.config';
import {EnvironmentToken, BASE_API_URL, MUZIKA_REDUX_STATE_KEY} from './config/injection.tokens';
import {JWTInterceptor} from './config/jwt-interceptor';
import {ContractProviders} from './contracts/index';
import {MuzikaContractService} from './providers/contract.service';
import {LocalStorage} from './providers/local-storage.service';
import {MuzikaWeb3Service} from './providers/web3.service';

const STORE_DIRECTIVES = [
  MuzikaWeb3Service,
  MuzikaContractService,
  ...ContractProviders,

  APIConfig,
  UserActions,
  LocalStorage,

  PostActions,
  CommentActions,

  {
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptor,
    multi: true
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgReduxModule,
    BrowserTransferStateModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ],
  providers: STORE_DIRECTIVES
})
export class MuzikaCoreModule {
  constructor(@Inject(PLATFORM_ID) private platformId,
              private transferState: TransferState,
              private ngRedux: NgRedux<IAppState>) {

    if (isPlatformServer(this.platformId)) { // In Server
      this.ngRedux.provideStore(createStore(rootReducer));
      if (!this.transferState.hasKey(MUZIKA_REDUX_STATE_KEY)) {
        this.transferState.onSerialize(MUZIKA_REDUX_STATE_KEY, () => this.ngRedux.getState());
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      const state = this.transferState.get<any>(MUZIKA_REDUX_STATE_KEY, null);
      if (state) { // Server side rendering을 통해 REDUX_STATE_KEY를 받아온 경우
        this.ngRedux.configureStore(rootReducer, state);
      } else {
        this.ngRedux.provideStore(createStore(rootReducer));
      }
    }
  }

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
        },
        {
          provide: BASE_API_URL,
          useValue: environment.base_api_url
        }
      ]
    };
  }
}
