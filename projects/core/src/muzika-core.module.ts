import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {isPlatformBrowser, isPlatformServer, CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Inject, ModuleWithProviders, NgModule, PLATFORM_ID} from '@angular/core';
import {BrowserTransferStateModule, TransferState} from '@angular/platform-browser';
import {createStore} from 'redux';
import {CommentActions, PostActions} from './actions';
import {UserActions} from './actions/user.action';
import {PaginationComponent} from './components/pagination/pagination.component';
import {BASE_API_URL, baseApiUrl, APIConfig, JWTInterceptor, MUZIKA_REDUX_STATE_KEY} from './config';
import {baseApiUrlStage, baseApiUrlDev} from './config/api.constant';
import {ContractProviders} from './contracts';
import {EnvironmentToken} from './environments/env_types';
import {environmentDev} from './environments/environment';
import {environmentProd} from './environments/environment.prod';
import {environmentStage} from './environments/environment.stage';
import {IAppState, rootReducer} from './reducers';
import {LocalStorage, MuzikaContractService} from './services';
import {MuzikaWeb3Service} from './web3.service';

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

    const base_api_url = {
      stage: baseApiUrlStage,
      dev: baseApiUrlDev,
      prod: baseApiUrl
    }[environmentType] || baseApiUrl;

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
          useValue: base_api_url
        }
      ]
    };
  }
}
