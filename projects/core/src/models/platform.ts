import {InjectionToken} from '@angular/core';

export type MuzikaPlatformType = 'electron' | 'app' | 'wallet';

export const PLATFORM_TYPE_TOKEN = new InjectionToken<MuzikaPlatformType>('MUZIKA_PLATFORM_TYPE');
