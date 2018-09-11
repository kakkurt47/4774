import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/\n/g, '<br>');
  }

  /****************************
   * example useage
   * <div [innerHTML]="'testi\n\nng \n t/n/nest\n\b\ning' | translate | nl2pbr"></div>
   ****************************/

}
