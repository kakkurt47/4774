import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';
import { Lang } from '../../../../models/lang';
import { SimpleMDConverterPipe } from '../../md-convert.pipe';

/* @TODO
 * For now, setTranslation not works at binding view
 */
@Component({
  selector: 'mzk-faq-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SimpleMDConverterPipe]
})
export class FAQMainPageComponent extends BaseComponent {

  /* tslint:disable:max-line-length */
  QAs = {
    [Lang.ENG]: [
      {
        Q: 'What is the muzika?',
        A: `
Muzika is a music blockchain project, which has been built on an existing business and global music platforms with
millions of users and fans across hundreds of nations, plus music artists from the globe, we aim at revolutionizing
the digital music industry with the creation of a new digital music ecosystem. Muzika project is led by
[Forbes-awarded](https://www.forbes.com/profile/mapiacompany-inc/?list=30under30-asia-media-marketing-advertising#208e305df7fe)
& Informatics Olympiad team members and endorsed by some of the most influential investors in South Korea and Asia.
The token economy will be backed up by ever-growing population of community users and fans.`
      },
      {
        Q: 'What is the Vision of Muzika?',
        A: `
We will create a new and decentralized digital music ecosystem that can autonomously achieve repeated cycles of
production and distribution, and allow for the consumption of musical creations, as well as reform the profit
distribution hierarchy. In such a way, Muzika will be the redemption of the global digital music industry.`
      },
      {
        Q: 'What Public Chain is Muzika built on? Is Muzika a DApp, Protocol or Inudstry Chain?',
        A: 'Muzika was built on Ethereum (ERC 20) with an DApp direction in mind.'
      },
      {
        Q: 'Why does Muzika need blockchain instead of a simple reward system?',
        A: `
Muzika Music Ecosystem will allow community members to receive Loyalty Points (LPs) as compensation for their activities
and contribution to the Muzika platform. and LPs can be regularly converted into MZKs.

Thus, we need to build a logic to exchange users’ LPs for MZKs. Smart contract is an effective means to ensure a
transparent and systematic conversion. For its implementation, we need to handle both LP and MZK in the same blockchain
network, including records of community activities (contribution) for LP compensation. Compiling all the relevant
information in the blockchain will ensure transparency and prevent any possibilities of LP manipulation.

When a transaction occurs on the Muzika platform, we will take a portion of MZKs as service fee for community
maintenance including LP-to-MZK conversion. We will build a logic that can automate periodic distribution of the
collected MZKs to users based on their LP holdings.

If we do not use blockchain for this process, we’d have to use our database on AWS cloud server or our MZK token
wallet to manage MZKs (those collected as service fee) and LPs. However, such an approach has two following problems:

1. LP holdings manipulation: if our database is hacked or abused by an internal developer, information on LP holdings can be manipulated. Such a possibility may cause distrust among community members on the management credibility of LPs and MZKs.
2. Lack of transparency in the distribution logic : if service fee is collected in the developer’s wallet, distribution logic is operated solely by the developer’s computer. In this case, even if the logic itself is open to the public, there is no guarantee that the logic actually runs as coded.

We do not need to worry about these problems if we use smart contract. We can store MZKs (collected as service fees)
in the smart contract, build a MZK distribution logic, and periodically send out MZKs to users based on their LP
quantities.
`
      },
      {
        Q: 'What is the blockchain technology Muzika is trying to build?',
        A: `
We aim at establishing a digital music ecosystem, and we have already successfully developed signing logic in Ontology,
and Ontology wallet owner identity can be verified in our server without sending their private keys to us, and our
accomplishment will make the processing of smart contract communication even more secured for ONT wallet users.
We will implement our smart contract on Ontology. Soon we will integrate Muzika payment system into our existing music
platforms such as MyMusicSheet, KPopPiano, Mapianist. Our aim is to develop a music DApp of blockchain protocol
(Ethereum & Ontology) in fastest possible way, instead of focusing our efforts on a protocol development, we will put
more focus on the development of DApp with better UX/UI.`
      },
      {
        Q: 'What\'s the difference between Muzika and other music blockchain projects?',
        A: `
Our key differentiation is, unlike most blockchain p2p projects, that our priority is to build an ecosystem
(since a user base matters) more than payment system. That's why we have multiple functions of MZK conceptualized in
our whitepaper. The payment system is just a part of our picture; we can even use the payment system outside the Muzika
ecosystem (in other music platforms that belong to Mapiacompany). We are not starting from the scratch, and we have
experiences on how to build and run a community by making loyal and incentivized customers, it's something that none of
the previous music blockchain projects possessed. And we can also leverage our existing platforms, because we can easily
bring our partner artists into the Muzika platform.`
      },
      {
        Q: 'What are Muzika\'s advantages?',
        A: `
Muzika ecosystem is built on the backs of our pre-existing platforms include Mapianist (www.mapianist.com),
MyMusicSheet (www.mymusicsheet.com), and KPopPiano (www.kpoppiano.com).
Through years of experience, we have acquired experiences on how to build a community run by loyal and incentivized
individuals. We categorize our advantages in three areas AS FOLLOWS:

**Team Superiority**

1. A strong team spirit with top capabilities and reciprocal trust that has endured through many hardships from previous projects. Seven top-notch developers of our team have proved their stability and dedication on this project. 
2. Our founders have proved to be able to get the necessary and substantial financial funding from VCs through all its difficulties despite their relatively young age. 
3. We have language skills, the know-how, and worldwide networks to go global.

**Technical Superiority**

Seven in-house developers are all well-versed in diverse areas of technology, especially our CTO and lead blockchain
developer, described in detail in the white paper, by reputation, capacity and achievement, are among the top developers
of their generation, confidently we can state that our development team has the technical superiority over all existing
music blockchain teams in the entire world. 

**Global Superiority from Underlying Asset**

Since its foundation in October 2015, our company has successfully built multinational platforms where millions of users
and thousands of musicians coexist and exchange their musical ideas, video performances, music sheets, and recording
files, etc. Our platforms hold globally top-notch technologies of copyright protection, commercial transaction, and
recommendation algorithm – all optimized for digital music transaction. Since the birth of our business, we have worked
with global musicians and cater to global fans, in sync with our existing underlying platforms.`
      },
      {
        Q: 'What\'s the token utility other than serving as a payment tool?',
        A: `
**Community building** will be one of the primary functions of MZK. Every member will be given the option to contribute
any amount of MZK they wish to the community deposit. Contributors will be referred to as Builders.
In return for their contribution, builders will be bestowed with two distinct benefits: Builder Certificate &
Contribution Level (from level 1 to 10)

**Sponsorship opportunities** within the new ecosystem, community members can sponsor and provide MZK to their chosen
artists by and become their patrons, backed up by the Muzika blockchain. Muzika will promote the sponsorship
opportunities by serving as a non-profit, commission-free platform among artists and fans.`
      },
      {
        Q: 'Will any famous musicians use Muzika and make some comments for Muzika?',
        A: `
We will get initial endorsements from cover/instrumental artists and Youtube stars in our existing platforms.
Some of the artists can be found in [our website](https://www.mymusicsheet.com/main).
We are capable of having famous musicians for the endorsement on Muzika if and when deemed as necessary.`
      }
    ],

    [Lang.CHN]: [
      {
        Q: 'What is the muzika?',
        A: `
Muzika is a music blockchain project, which has been built on an existing business and global music platforms with
millions of users and fans across hundreds of nations, plus music artists from the globe, we aim at revolutionizing
the digital music industry with the creation of a new digital music ecosystem. Muzika project is led by
[Forbes-awarded](https://www.forbes.com/profile/mapiacompany-inc/?list=30under30-asia-media-marketing-advertising#208e305df7fe)
& Informatics Olympiad team members and endorsed by some of the most influential investors in South Korea and Asia.
The token economy will be backed up by ever-growing population of community users and fans.`
      },
      {
        Q: 'What is the Vision of Muzika?',
        A: `
We will create a new and decentralized digital music ecosystem that can autonomously achieve repeated cycles of
production and distribution, and allow for the consumption of musical creations, as well as reform the profit
distribution hierarchy. In such a way, Muzika will be the redemption of the global digital music industry.`
      },
      {
        Q: 'What Public Chain is Muzika built on? Is Muzika a DApp, Protocol or Inudstry Chain?',
        A: 'Muzika was built on Ethereum (ERC 20) with an DApp direction in mind.'
      },
      {
        Q: 'Why does Muzika need blockchain instead of a simple reward system?',
        A: `
Muzika Music Ecosystem will allow community members to receive Loyalty Points (LPs) as compensation for their activities
and contribution to the Muzika platform. and LPs can be regularly converted into MZKs.

Thus, we need to build a logic to exchange users’ LPs for MZKs. Smart contract is an effective means to ensure a
transparent and systematic conversion. For its implementation, we need to handle both LP and MZK in the same blockchain
network, including records of community activities (contribution) for LP compensation. Compiling all the relevant
information in the blockchain will ensure transparency and prevent any possibilities of LP manipulation.

When a transaction occurs on the Muzika platform, we will take a portion of MZKs as service fee for community
maintenance including LP-to-MZK conversion. We will build a logic that can automate periodic distribution of the
collected MZKs to users based on their LP holdings.

If we do not use blockchain for this process, we’d have to use our database on AWS cloud server or our MZK token
wallet to manage MZKs (those collected as service fee) and LPs. However, such an approach has two following problems:

1. LP holdings manipulation: if our database is hacked or abused by an internal developer, information on LP holdings can be manipulated. Such a possibility may cause distrust among community members on the management credibility of LPs and MZKs.
2. Lack of transparency in the distribution logic : if service fee is collected in the developer’s wallet, distribution logic is operated solely by the developer’s computer. In this case, even if the logic itself is open to the public, there is no guarantee that the logic actually runs as coded.

We do not need to worry about these problems if we use smart contract. We can store MZKs (collected as service fees)
in the smart contract, build a MZK distribution logic, and periodically send out MZKs to users based on their LP
quantities.
`
      },
      {
        Q: 'What is the blockchain technology Muzika is trying to build?',
        A: `
We aim at establishing a digital music ecosystem, and we have already successfully developed signing logic in Ontology,
and Ontology wallet owner identity can be verified in our server without sending their private keys to us, and our
accomplishment will make the processing of smart contract communication even more secured for ONT wallet users.
We will implement our smart contract on Ontology. Soon we will integrate Muzika payment system into our existing music
platforms such as MyMusicSheet, KPopPiano, Mapianist. Our aim is to develop a music DApp of blockchain protocol
(Ethereum & Ontology) in fastest possible way, instead of focusing our efforts on a protocol development, we will put
more focus on the development of DApp with better UX/UI.`
      },
      {
        Q: 'What\'s the difference between Muzika and other music blockchain projects?',
        A: `
Our key differentiation is, unlike most blockchain p2p projects, that our priority is to build an ecosystem
(since a user base matters) more than payment system. That's why we have multiple functions of MZK conceptualized in
our whitepaper. The payment system is just a part of our picture; we can even use the payment system outside the Muzika
ecosystem (in other music platforms that belong to Mapiacompany). We are not starting from the scratch, and we have
experiences on how to build and run a community by making loyal and incentivized customers, it's something that none of
the previous music blockchain projects possessed. And we can also leverage our existing platforms, because we can easily
bring our partner artists into the Muzika platform.`
      },
      {
        Q: 'What are Muzika\'s advantages?',
        A: `
Muzika ecosystem is built on the backs of our pre-existing platforms include Mapianist (www.mapianist.com),
MyMusicSheet (www.mymusicsheet.com), and KPopPiano (www.kpoppiano.com).
Through years of experience, we have acquired experiences on how to build a community run by loyal and incentivized
individuals. We categorize our advantages in three areas AS FOLLOWS:

**Team Superiority**

1. A strong team spirit with top capabilities and reciprocal trust that has endured through many hardships from previous projects. Seven top-notch developers of our team have proved their stability and dedication on this project. 
2. Our founders have proved to be able to get the necessary and substantial financial funding from VCs through all its difficulties despite their relatively young age. 
3. We have language skills, the know-how, and worldwide networks to go global.

**Technical Superiority**

Seven in-house developers are all well-versed in diverse areas of technology, especially our CTO and lead blockchain
developer, described in detail in the white paper, by reputation, capacity and achievement, are among the top developers
of their generation, confidently we can state that our development team has the technical superiority over all existing
music blockchain teams in the entire world. 

**Global Superiority from Underlying Asset**

Since its foundation in October 2015, our company has successfully built multinational platforms where millions of users
and thousands of musicians coexist and exchange their musical ideas, video performances, music sheets, and recording
files, etc. Our platforms hold globally top-notch technologies of copyright protection, commercial transaction, and
recommendation algorithm – all optimized for digital music transaction. Since the birth of our business, we have worked
with global musicians and cater to global fans, in sync with our existing underlying platforms.`
      },
      {
        Q: 'What\'s the token utility other than serving as a payment tool?',
        A: `
**Community building** will be one of the primary functions of MZK. Every member will be given the option to contribute
any amount of MZK they wish to the community deposit. Contributors will be referred to as Builders.
In return for their contribution, builders will be bestowed with two distinct benefits: Builder Certificate &
Contribution Level (from level 1 to 10)

**Sponsorship opportunities** within the new ecosystem, community members can sponsor and provide MZK to their chosen
artists by and become their patrons, backed up by the Muzika blockchain. Muzika will promote the sponsorship
opportunities by serving as a non-profit, commission-free platform among artists and fans.`
      },
      {
        Q: 'Will any famous musicians use Muzika and make some comments for Muzika?',
        A: `
We will get initial endorsements from cover/instrumental artists and Youtube stars in our existing platforms.
Some of the artists can be found in [our website](https://www.mymusicsheet.com/main).
We are capable of having famous musicians for the endorsement on Muzika if and when deemed as necessary.`
      }
    ],

    [Lang.KOR]: [
      {
        Q: 'What is the muzika?',
        A: `
Muzika is a music blockchain project, which has been built on an existing business and global music platforms with
millions of users and fans across hundreds of nations, plus music artists from the globe, we aim at revolutionizing
the digital music industry with the creation of a new digital music ecosystem. Muzika project is led by
[Forbes-awarded](https://www.forbes.com/profile/mapiacompany-inc/?list=30under30-asia-media-marketing-advertising#208e305df7fe)
& Informatics Olympiad team members and endorsed by some of the most influential investors in South Korea and Asia.
The token economy will be backed up by ever-growing population of community users and fans.`
      },
      {
        Q: 'What is the Vision of Muzika?',
        A: `
We will create a new and decentralized digital music ecosystem that can autonomously achieve repeated cycles of
production and distribution, and allow for the consumption of musical creations, as well as reform the profit
distribution hierarchy. In such a way, Muzika will be the redemption of the global digital music industry.`
      },
      {
        Q: 'What Public Chain is Muzika built on? Is Muzika a DApp, Protocol or Inudstry Chain?',
        A: 'Muzika was built on Ethereum (ERC 20) with an DApp direction in mind.'
      },
      {
        Q: 'Why does Muzika need blockchain instead of a simple reward system?',
        A: `
Muzika Music Ecosystem will allow community members to receive Loyalty Points (LPs) as compensation for their activities
and contribution to the Muzika platform. and LPs can be regularly converted into MZKs.

Thus, we need to build a logic to exchange users’ LPs for MZKs. Smart contract is an effective means to ensure a
transparent and systematic conversion. For its implementation, we need to handle both LP and MZK in the same blockchain
network, including records of community activities (contribution) for LP compensation. Compiling all the relevant
information in the blockchain will ensure transparency and prevent any possibilities of LP manipulation.

When a transaction occurs on the Muzika platform, we will take a portion of MZKs as service fee for community
maintenance including LP-to-MZK conversion. We will build a logic that can automate periodic distribution of the
collected MZKs to users based on their LP holdings.

If we do not use blockchain for this process, we’d have to use our database on AWS cloud server or our MZK token
wallet to manage MZKs (those collected as service fee) and LPs. However, such an approach has two following problems:

1. LP holdings manipulation: if our database is hacked or abused by an internal developer, information on LP holdings can be manipulated. Such a possibility may cause distrust among community members on the management credibility of LPs and MZKs.
2. Lack of transparency in the distribution logic : if service fee is collected in the developer’s wallet, distribution logic is operated solely by the developer’s computer. In this case, even if the logic itself is open to the public, there is no guarantee that the logic actually runs as coded.

We do not need to worry about these problems if we use smart contract. We can store MZKs (collected as service fees)
in the smart contract, build a MZK distribution logic, and periodically send out MZKs to users based on their LP
quantities.
`
      },
      {
        Q: 'What is the blockchain technology Muzika is trying to build?',
        A: `
We aim at establishing a digital music ecosystem, and we have already successfully developed signing logic in Ontology,
and Ontology wallet owner identity can be verified in our server without sending their private keys to us, and our
accomplishment will make the processing of smart contract communication even more secured for ONT wallet users.
We will implement our smart contract on Ontology. Soon we will integrate Muzika payment system into our existing music
platforms such as MyMusicSheet, KPopPiano, Mapianist. Our aim is to develop a music DApp of blockchain protocol
(Ethereum & Ontology) in fastest possible way, instead of focusing our efforts on a protocol development, we will put
more focus on the development of DApp with better UX/UI.`
      },
      {
        Q: 'What\'s the difference between Muzika and other music blockchain projects?',
        A: `
Our key differentiation is, unlike most blockchain p2p projects, that our priority is to build an ecosystem
(since a user base matters) more than payment system. That's why we have multiple functions of MZK conceptualized in
our whitepaper. The payment system is just a part of our picture; we can even use the payment system outside the Muzika
ecosystem (in other music platforms that belong to Mapiacompany). We are not starting from the scratch, and we have
experiences on how to build and run a community by making loyal and incentivized customers, it's something that none of
the previous music blockchain projects possessed. And we can also leverage our existing platforms, because we can easily
bring our partner artists into the Muzika platform.`
      },
      {
        Q: 'What are Muzika\'s advantages?',
        A: `
Muzika ecosystem is built on the backs of our pre-existing platforms include Mapianist (www.mapianist.com),
MyMusicSheet (www.mymusicsheet.com), and KPopPiano (www.kpoppiano.com).
Through years of experience, we have acquired experiences on how to build a community run by loyal and incentivized
individuals. We categorize our advantages in three areas AS FOLLOWS:

**Team Superiority**

1. A strong team spirit with top capabilities and reciprocal trust that has endured through many hardships from previous projects. Seven top-notch developers of our team have proved their stability and dedication on this project. 
2. Our founders have proved to be able to get the necessary and substantial financial funding from VCs through all its difficulties despite their relatively young age. 
3. We have language skills, the know-how, and worldwide networks to go global.

**Technical Superiority**

Seven in-house developers are all well-versed in diverse areas of technology, especially our CTO and lead blockchain
developer, described in detail in the white paper, by reputation, capacity and achievement, are among the top developers
of their generation, confidently we can state that our development team has the technical superiority over all existing
music blockchain teams in the entire world. 

**Global Superiority from Underlying Asset**

Since its foundation in October 2015, our company has successfully built multinational platforms where millions of users
and thousands of musicians coexist and exchange their musical ideas, video performances, music sheets, and recording
files, etc. Our platforms hold globally top-notch technologies of copyright protection, commercial transaction, and
recommendation algorithm – all optimized for digital music transaction. Since the birth of our business, we have worked
with global musicians and cater to global fans, in sync with our existing underlying platforms.`
      },
      {
        Q: 'What\'s the token utility other than serving as a payment tool?',
        A: `
**Community building** will be one of the primary functions of MZK. Every member will be given the option to contribute
any amount of MZK they wish to the community deposit. Contributors will be referred to as Builders.
In return for their contribution, builders will be bestowed with two distinct benefits: Builder Certificate &
Contribution Level (from level 1 to 10)

**Sponsorship opportunities** within the new ecosystem, community members can sponsor and provide MZK to their chosen
artists by and become their patrons, backed up by the Muzika blockchain. Muzika will promote the sponsorship
opportunities by serving as a non-profit, commission-free platform among artists and fans.`
      },
      {
        Q: 'Will any famous musicians use Muzika and make some comments for Muzika?',
        A: `
We will get initial endorsements from cover/instrumental artists and Youtube stars in our existing platforms.
Some of the artists can be found in [our website](https://www.mymusicsheet.com/main).
We are capable of having famous musicians for the endorsement on Muzika if and when deemed as necessary.`
      }
    ]
  };
  /* tslint:enable:max-line-length */

  currentLang: string = Lang.ENG;
  numOfQAs: number;

  constructor(private translateService: TranslateService,
              private mdConvertPipe: SimpleMDConverterPipe) {
    super();
    this.numOfQAs = this.QAs.en.length;
  }

  ngOnInit() {
    super.ngOnInit();

    for (const lang in this.QAs) {
      for (let i = 0; i < this.QAs[lang].length; i++) {
        // These are static contents. So it is enough to transform plain text into html one time
        this.QAs[lang][i].A = this.mdConvertPipe.transform(this.QAs[lang][i].A);
      }
    }

    this._sub.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.currentLang = lang.lang;
      })
    );
  }
}
