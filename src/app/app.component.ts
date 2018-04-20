import {ChangeDetectorRef, Component, NgZone, TemplateRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
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
  modalRef: BsModalRef;
  selectedAddress: string;
  papers: any[] = [];

  title: string = 'Hello Paper';
  price: number = 40000;
  hash: string = '0ab0f0abfd0ab0fd0bd1f5d';

  constructor(private web3Service: Web3Service,
              private cd: ChangeDetectorRef,
              private modalService: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadPapers();
  }

  loadAccounts() {
    this.web3Service.ready().subscribe(web3 => {
      this.web3 = web3;
      console.log(web3);
      this.accounts = [];
      fromArray(web3.eth.accounts).pipe(
        mergeMap(acc => {
          return new Observable<any>(observer => {
            web3.eth.getBalance(acc, (err, balance) => {
              if (err) {
                return;
              }

              this.web3Service.MuzikaCoin.deployed().then(ins => {
                return ins.balanceOf(acc);
              }).then(tokenBalance => {
                observer.next({address: acc, balance: web3.fromWei(balance).toString(), token: tokenBalance.toNumber() / 1e+18});
                observer.complete();
              });
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
          this.selectedAddress = this.accounts[0].address;
          this.cd.detectChanges();
        }
      );
    });
  }

  openModal(templateRef: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateRef, {class: 'modal-lg'});
  }

  sellPaper(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      alert('Invalid!');
    } else {
      let address = this.selectedAddress;

      this.web3Service.MuzikaPaperContract.deployed().then(ins => {
        console.log(ins);
        return ins.sell(form.value.title, form.value.price * 1e+18, form.value.hash, {from: address, gas: 6000000});
      }).then(() => {
        this.loadPapers();
      }).catch(err => {
        console.log(err);
      });
    }
  }

  buyPaper(paperID: number) {
    this.web3Service.MuzikaPaperContract.deployed().then(ins => {
      return ins.purchase(paperID, {from: this.selectedAddress, gas: 6000000});
    }).then(() => {
      this.loadAccounts();
      alert('악보 구매에 성공함');
    }).catch(() => {
      alert('악보 구매 실패');
    });
  }

  loadPapers() {
    this.papers = [];
    this.web3Service.MuzikaPaperContract.deployed().then(ins => {
      return ins.lastPaperID.call();
    }).then(lastPaperID => {
      console.log(lastPaperID);
      let ins = this.web3Service.MuzikaPaperContract.at(this.web3Service.MuzikaPaperContract.address);

      let promises = [];
      for(let i = 1; i <= lastPaperID.toNumber(); i++) {
        promises.push(ins.registeredPaper.call(i).then(paper => {
          this.papers.push({
            id: paper[0].toNumber(),
            seller: paper[1],
            title: paper[2],
            price: paper[3].toNumber() / 1e+18,
            fileHash: paper[5]
          });
          console.log(paper);
        }));
      }

      return Promise.all(promises);
    });
  }
}
