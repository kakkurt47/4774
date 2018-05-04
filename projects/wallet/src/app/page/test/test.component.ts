import {ChangeDetectorRef, Component, Inject, TemplateRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MuzikaCoin, MuzikaPaperContract, IMuzikaCoin, IMuzikaPaperContract} from '../../../contracts';
import {TruffleContract} from '../../../contracts/typechain-runtime';
import {BaseComponent} from '../../../shared/base.component';
import {Web3} from '../../../typings/web3';
import {promisify} from '../../../utils';
import {WEB3} from '../../web3.provider';

@Component({
  selector: 'app-test-page',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestPageComponent extends BaseComponent {
  accounts: any[] = [];
  modalRef: BsModalRef;
  selectedAddress: string;
  papers: any[] = [];

  title: string = 'Hello Paper';
  price: number = 40000;
  hash: string = '0ab0f0abfd0ab0fd0bd1f5d';

  constructor(@Inject(WEB3) private web3: Web3,
              @Inject(MuzikaCoin) private muzikaCoin: TruffleContract<IMuzikaCoin>,
              @Inject(MuzikaPaperContract) private muzikaPaper: TruffleContract<IMuzikaPaperContract>,
              private cd: ChangeDetectorRef,
              private modalService: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadPapers();
  }

  async loadAccounts() {
    console.log(this.web3);
    this.accounts = await Promise.all(
      this.web3.eth.accounts.map(async account => {
        const coin = await this.muzikaCoin.deployed();

        const balance = this.web3.fromWei(await promisify(this.web3.eth.getBalance, account), 'ether').toString();
        const token = this.web3.fromWei(await coin.balanceOf(account), 'ether').toString();

        return {
          address: account,
          balance: balance,
          token: token
        }
      })
    );

    this.selectedAddress = this.accounts[0].address;
  }

  openModal(templateRef: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateRef, {class: 'modal-lg'});
  }

  async sellPaper(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      alert('Invalid!');
    } else {
      try {
        const address = this.selectedAddress;
        const paperIns = await this.muzikaPaper.deployed();

        console.log(paperIns);

        const gas = await paperIns.sell.estimateGas(form.value.title, form.value.price * 1e18, form.value.hash);
        console.log('sell paper gas: ' , gas);
        await paperIns.sell(form.value.title, form.value.price * 1e18, form.value.hash, {from: address, gas: gas});

        this.loadPapers();
      } catch(err) {
        console.log(err);
      }
    }
  }

  async buyPaper(paperID: number) {
    try {
      const coinIns = await this.muzikaCoin.deployed();
      const paperIns = await this.muzikaPaper.deployed();

      const paper = await paperIns.registeredPaper(paperID);
      const price = paper[3];

      console.log(coinIns, price);
      await coinIns.approve(paperIns.address, price, {from: this.selectedAddress});
      console.log('approved');
      await paperIns.purchase(paperID, {from: this.selectedAddress});

      this.loadAccounts();
      alert('악보 구매에 성공함');
    } catch(err) {
      console.log('악보 구매 실패', err);
      alert('악보 구매 실패');
    }
  }

  loadPapers() {
    this.papers = [];
    this.muzikaPaper.deployed().then(ins => {
      return ins.lastPaperID();
    }).then(lastPaperID => {
      console.log(lastPaperID);
      let ins = this.muzikaPaper.at(this.muzikaPaper.address);

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

  async transferCoin(form: NgForm) {
    console.log(form);
    if (form.valid) {
      const coinIns = await this.muzikaCoin.deployed();

      console.log(form.value.to);
      await coinIns.transfer(form.value.to, form.value.amount * (10 ** 18), {from: this.selectedAddress});
      this.loadAccounts();
    }
  }
}
