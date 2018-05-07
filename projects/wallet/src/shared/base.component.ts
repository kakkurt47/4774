import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

export class BaseComponent implements OnInit, OnDestroy {
  _sub: Subscription[] = [];

  ngOnDestroy(): void {
    this._sub.forEach(sub => sub.unsubscribe());
    this._sub = [];
  }

  ngOnInit(): void {
  }
}
