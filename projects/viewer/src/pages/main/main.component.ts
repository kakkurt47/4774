import {select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {BaseComponent, CommunityPost, ExtendedWeb3, MuzikaCoin, SheetPost, unitUp, User} from '@muzika/core';
import {Observable, combineLatest, from} from 'rxjs';
import {BestPostsMock, SheetPostsMock} from '../../mock/posts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BaseComponent {
  sheets: SheetPost[] = SheetPostsMock.slice(0, 5);
  posts: CommunityPost[] = BestPostsMock;

  topSheets: SheetPost[];

  @select(['user', 'currentUser'])
  currentUserObs: Observable<User>;
  currentUser: User;
  balances: {
    mzk: number | string;
    dollar: number | string;
  };

  constructor(private muzikaCoin: MuzikaCoin,
              private router: Router,
              private web3: ExtendedWeb3) {
    super();
    this.topSheets = this.sheets.slice(0, 3);
    this.balances = <any>{};
  }

  ngOnInit() {
    this.muzikaCoin.deployed();

    this.router.navigateByUrl('/board/sheet/write');

    this._sub.push(
      combineLatest(
        from(this.muzikaCoin.deployed()),
        this.currentUserObs
      ).subscribe(async ([coin, user]) => {
        console.log('33', user);
        if (user) {
          const rawBalance = await coin.balanceOf(user.address);
          this.balances = {
            mzk: unitUp(rawBalance),
            // @TODO deploy muzika loyalty point
            dollar: 0
          };
        }
      })
    );
  }
}
