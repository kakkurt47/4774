
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {filter} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class IpfsEventService {
  private _event: Subject<IpfsEvent> = new BehaviorSubject(null);

  constructor() {
  }

  emitEvent(data: IpfsEvent) {
    this._event.next(data);
  }

  event(type?: string): Observable<IpfsEvent> {
    return this._event.asObservable().pipe(
      filter(e => {
        return e !== null && (type ? e.type === type : true);
      })
    );
  }
}

export interface IpfsEvent {
  type: string;
  data: any;
}
