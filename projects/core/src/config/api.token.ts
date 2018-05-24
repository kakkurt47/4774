import {InjectionToken} from '@angular/core';
import {makeStateKey} from '@angular/platform-browser';

export const BASE_API_URL = new InjectionToken<string>('MUZIKA_BASE_API_URL');

export const MUZIKA_REDUX_STATE_KEY = makeStateKey<any>('muzika.redux.state');
