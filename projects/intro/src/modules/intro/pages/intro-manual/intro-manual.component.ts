import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';
import { Lang } from '../../../../models/lang';
import { SimpleMDConverterPipe } from '../../../shared/md-convert.pipe';

@Component({
  selector: 'app-intro-manual',
  templateUrl: './intro-manual.component.html',
  styleUrls: [
    './intro-manual.component.scss'
  ],
  providers: [SimpleMDConverterPipe]
})
export class IntroManualPageComponent extends BaseComponent {

  /* tslint:disable:max-line-length */
  description = {
    [Lang.ENG]:
`
**Muzika Studio** allows artists to manage their wallets and create Smart Contract for their digital
music products, including music sheets and sound sources. The application also provides an
intuitive user interface to encrypt and upload the digital products on IPFS – a decentralized
file storage system – which will be made available for downloads and streaming when users
make purchase in the Muzika Platform.

Muzika Studio now supports Ethereum and Ontology network, and users can choose to login
to either Testnet or Mainnet.

![Login Interface](assets/intro-img/manual/manual-1.png)

#### Login Interface

Users can login to the network (Ethereum or Ontology) and create or import a new wallet.
When a user makes login, he/she will be asked to sign a temporary message, which will be
sent to the server for user verification. We do not save private keys of users in the server.

![Create or Import Wallet](assets/intro-img/manual/manual-2.png)

#### Create Accounts

You can create or import a new wallet. You will be asked provide a set of wallet name and
password for your account. Password is required because your private key will be encrypted

![Import Accounts](assets/intro-img/manual/manual-3.png)

#### Import

You can choose to import your existing wallet to the Muzika Studio, by creating a wallet name
and providing the key file.

![View your wallet list](assets/intro-img/manual/manual-4.png)

#### View your wallet list

Click on the 'Want to manage all your accounts?' button to view information on all your
wallets available for login. This is similar to the list of e-mail addresses in the Gmail login
interface. We also support quick transfer of ETH, ONT, ONG, and MZK from your registered
wallets to other addresses. When you click on the send button on the bottom right corner,
you will be asked to provide your wallet password.

![Wallet list](assets/intro-img/manual/manual-5.png)

![Wallet list](assets/intro-img/manual/manual-6.png)

You can also delete your wallet. A warning sign will appear to when you click the ‘delete’
button.

#### When you click on the login button

![Wallet Login](assets/intro-img/manual/manual-7.png)

You will see the temporary message above. Click on the ‘Sign’ button within 5 minutes to
confirm your login.

#### Main Interface

![Main Interface](assets/intro-img/manual/manual-8.png)

When you get logged in, you will see the main interface above. It shows your wallet address,
balances, and artist information. On the top let corner, you will now see the ‘Studio’ icon.
Click on this icon to upload your digital music products and create a Smart Contract.

#### Studio

![Studio](assets/intro-img/manual/manual-9.png)

The Studio page allows you to upload your sheet music and provide further information. Note
that other file types including MP3 and AVI will also be available in the official version. After
putting all the information, click on the ‘Upload’ button at the bottom right corner to upload
your file on IPFS.

![Sign transaction](assets/intro-img/manual/manual-10.png)

You will see the screen above when the upload gets completed. Click on the 'Sign' button to
create a Smart Contract transaction.

![Broadcast Success](assets/intro-img/manual/manual-11.png)

Click on the TxHash link

![Broadcast Success](assets/intro-img/manual/manual-12.png)

You can view your transaction information on Etherscan.

![Broadcast Success](assets/intro-img/manual/manual-13.png)

Also, all files will be encrypted and uploaded to IPFS.

<table><thead>
  <tr><th>Functions</th><th>Ethereum</th><th>Ontology</th></tr>
</thead><tbody>
  <tr><td> Login                                   </td><td><!--fa-check--></td><td><!--fa-check--></td></tr>
  <tr><td> Create account                          </td><td><!--fa-check--></td><td><!--fa-check--></td></tr>
  <tr><td> View account balance                    </td><td><!--fa-check--></td><td><!--fa-check--></td></tr>
  <tr><td> Transfer tokens                         </td><td><!--fa-check--></td><td>               </td></tr>
  <tr><td> Import / Export wallets                 </td><td>               </td><td>               </td></tr>
  <tr><td> Artist information                      </td><td colspan="2"><!--fa-check--></td></tr>
  <tr><td> View total revenue/profit               </td><td colspan="2">               </td></tr>
  <tr><td> Main Interface                          </td><td colspan="2"><!--fa-check--></td></tr>
  <tr><td> Upload files on IPFS                    </td><td colspan="2"><!--fa-check--></td></tr>
  <tr><td> Create Smart Contract for sheet music   </td><td><!--fa-check--></td><td>               </td></tr>
  <tr><td> Create Smart Contract for sound sources </td><td>               </td><td>               </td></tr>
  <tr><td> Streaming on IPFS                       </td><td colspan="2"><!--fa-check--></td></tr>
</tbody></table>

Muzika Studio is now fully integrated with IPFS – Encrypted streaming service based on IPFS
is also available. Our current development focus is on the UI/UX improvement and integration
to the Ontology protocol.
`,

    [Lang.CHN]:
`
`,

    [Lang.KOR]:
`
`
  };
  /* tslint:enable:max-line-length */

  currentLang: string = Lang.ENG;
  langDependedDescription: string;

  constructor(private translateService: TranslateService,
              private mdConvertPipe: SimpleMDConverterPipe) {
    super();

    this.langDependedDescription = this.description[this.currentLang];
  }

  ngOnInit() {
    super.ngOnInit();

    for (const lang in this.description) {
      this.description[lang] = this.mdConvertPipe.transform(this.description[lang]);
    }

    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.currentLang = lang.lang;
        // this.langDependedDescription = this.description[this.currentLang];
        /* Currently, support only english. If you support more language,
         * remove line below and uncomment above
         */
        this.langDependedDescription = this.description[Lang.ENG];
      })
    );
  }
}
