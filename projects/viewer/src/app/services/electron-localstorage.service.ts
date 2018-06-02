import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ElectronService} from '../providers/electron.service';

@Injectable()
export class ElectronLocalStorage {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object,
              private electronService: ElectronService) {
    /**
     * @TODO think another way to share data inside localStorage
     * Token is must shared between main and renderer
     */
    this.electronService.storage.set('token', this.getItem('token'));
  }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
      this.electronService.storage.set(key, value);
    }
  }

  getItem(key: string, defaultValue?: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
      this.electronService.storage.remove(key);
    }
  }
}
