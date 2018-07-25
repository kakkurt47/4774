import {Pipe, PipeTransform} from '@angular/core';
import {default as BigNumber} from 'bignumber.js';

@Pipe({name: 'hexToNumber'})
export class HexToNumberPipe implements PipeTransform {
  transform(value: string): string {
    return new BigNumber(value, 16).toString();
  }
}
