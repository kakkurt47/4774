import {Injectable} from '@angular/core';
import * as _alertify from 'alertify.js';

@Injectable()
export class AlertService {
  private alertify: any;

  constructor() {
    this.alertify = _alertify.okBtn('확인').cancelBtn('취소');
  }

  alert(...args) {
    return this.alertify.alert(...args);
  }

  confirm(...args) {
    return this.alertify.confirm(...args);
  }
}
