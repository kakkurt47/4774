import {Injectable} from '@angular/core';
import * as _alertify from 'alertify.js';

@Injectable({providedIn: 'root'})
export class AlertService {
  private alertify: any;

  constructor() {
    this.alertify = _alertify.okBtn('확인').cancelBtn('취소');
  }

  alert(...args) {
    return this.alertify.alert(...args);
  }

  confirm(message: string): Promise<boolean>;
  confirm(message: string, callback: (returns: string) => any, error?: (e) => any): void;

  confirm(...args) {
    return this.alertify.confirm(...args);
  }

  defaultValue(value: string): Promise<this> {
    return this.alertify.defaultValue(value);
  }

  prompt(...args) {
    return this.alertify.prompt(...args);
  }
}
