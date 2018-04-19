import {ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {fromArray} from 'rxjs/internal/observable/fromArray';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';
import {Web3Service} from '../service/web3.service';
import {BaseComponent} from '../shared/base.component';

declare var Web3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  accounts: any[] = [];
  web3: any;

  constructor(private web3Service: Web3Service,
              private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.web3Service.ready().subscribe(web3 => {
      this.web3 = web3;
      console.log(web3);
      fromArray(web3.eth.accounts).pipe(
        mergeMap(acc => {
          return new Observable<any>(observer => {
            web3.eth.getBalance(acc, (err, balance) => {
              if (err) {
                return;
              }

              observer.next({address: acc, balance: web3.fromWei(balance)});
              observer.complete();
            })
          });
        })
      ).subscribe(
        account => {
          this.accounts = [...this.accounts, account];
        },
        err => {

        },
        () => {
          console.log(this.accounts);
          this.cd.detectChanges();
        }
      );
    });
  }
}
