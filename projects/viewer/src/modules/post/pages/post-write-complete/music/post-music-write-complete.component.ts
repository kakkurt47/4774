import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '@muzika/core';
import {ElectronService} from '../../../../../providers/electron.service';

@Component({
  selector: 'app-post-music-write-complete',
  templateUrl: './post-music-write-complete.component.html',
  styleUrls: ['./post-music-write-complete.component.scss']
})
export class PostMusicWriteCompleteComponent extends BaseComponent {
  txHash: string;
  sheetTitle: string;

  constructor(private route: ActivatedRoute,
              private electronService: ElectronService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this._sub.push(
      this.route.queryParams.subscribe(params => {
        this.txHash = params.txHash;
        this.sheetTitle = params.title;
      })
    );
  }

  goScan(txHash: string) {
    this.electronService.shell.openExternal(`https://ropsten.etherscan.io/tx/${txHash}`);
  }
}
