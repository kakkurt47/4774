import {EventEmitter, Injectable} from '@angular/core';
import {LocalStorage} from '@muzika/core';
import * as ethUtil from 'ethereumjs-util';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class WalletStorageService {
  private _stateChange: Subject<boolean> = new BehaviorSubject(false);
  private _eventSignPersonalMessage: Subject<any> = new BehaviorSubject(null);
  private _eventSignTransaction: Subject<any> = new BehaviorSubject(null);

  // @TODO currently use localstorage
  constructor(private localStorage: LocalStorage) {
  }

  get accounts(): string[] {
    const currentState: string[] = JSON.parse(this.localStorage.getItem('wallets', '[]'));

    return currentState.map(key => {
      const address = ethUtil.privateToAddress(ethUtil.toBuffer(key));

      return ethUtil.toChecksumAddress(ethUtil.bufferToHex(address));
    });
  }

  addWallet(privateKey: string): void {
    const currentState: string[] = JSON.parse(this.localStorage.getItem('wallets', '[]'));

    if (currentState.indexOf(privateKey) === -1) {
      currentState.push(privateKey);
      this.localStorage.setItem('wallets', JSON.stringify(currentState));
      this._stateChange.next(true);
    }
  }

  get walletsObs(): Observable<string[]> {
    return this._stateChange.asObservable().pipe(
      map(() => {
        return JSON.parse(this.localStorage.getItem('wallets', '[]'));
      })
    );
  }

  privateKeyOf(address: string): string {
    const currentState: string[] = JSON.parse(this.localStorage.getItem('wallets', '[]'));

    const filter = currentState
      .map(key => ethUtil.toBuffer(key))
      .filter(key => {
        return ethUtil.bufferToHex(ethUtil.privateToAddress(key)) === address.toLowerCase();
      });

    if (filter.length === 0) {
      throw new Error(`Unknown address - unable to sign message for this address: "${address}"`);
    } else {
      return filter[0];
    }
  }

  get eventSignMessage(): Observable<any> {
    return this._eventSignPersonalMessage.asObservable();
  }

  emitReadySignMessage(data: any) {
    this._eventSignPersonalMessage.next(data);
  }

  get eventSignTransaction(): Observable<any> {
    return this._eventSignTransaction.asObservable();
  }

  emitReadySignTransaction(data: any) {
    this._eventSignTransaction.next(data);
  }
}
