import {Component, Inject, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LedgerProvider} from '../../../../../core/src/web3-providers/ledger.provider';
import {BaseComponent} from '../../../shared/base.component';
import {AddressOnlyProvider, MetamaskProvider, RPCProvider, WalletProvider, Web3, WEB3} from '@muzika/core';
import {promisify} from '../../../utils';
import * as _alertify from 'alertify.js';
import {ArtistsMock} from '../../mock/artists';
import {SheetsMock} from '../../mock/sheets';
import {Artist} from '../../models/artist';
import {SheetMusic} from '../../models/sheet-music';

const alertify = _alertify.okBtn('확인').cancelBtn('취소');

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  artists: Artist[] = ArtistsMock;
  sheets: SheetMusic[] = SheetsMock;

  topSheets: SheetMusic[];

  constructor() {
    super();
    this.topSheets = this.sheets.slice(0, 3);
  }
}
