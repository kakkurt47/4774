import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../models/base.component';
import { Lang } from '../../../../models/lang';
import { SimpleMDConverterPipe } from '../../../shared/md-convert.pipe';

/* @TODO
 * For now, setTranslation not works at binding view
 */
@Component({
  selector: 'mzk-faq-main',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  providers: [SimpleMDConverterPipe]
})
export class SoundPrivacyPageComponent extends BaseComponent {

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
        Q: 'Will any famous musicians use Muzika and make some comments for Muzika?',
        A: `
We will get initial endorsements from cover/instrumental artists and Youtube stars in our existing platforms.
Some of the artists can be found in [our website](https://www.mymusicsheet.com/main).
We are capable of having famous musicians for the endorsement on Muzika if and when deemed as necessary.`
      }
    ],

    [Lang.CHN]: [
      {
        Q: '什么是Muzika？',
        A: `
Muzika是一个建立在现存音乐商务平台基础上的数字音乐区块链生态系统，我们拥有数百万来自世界各地的基础用户与音乐艺术家，
我们的目标是通过建立起一个新的数字音乐生态系统来完成对数字音乐产业的革命。

Muzika区块链核心团队是由获得[福布斯](https://www.forbes.com/profile/mapiacompany-inc/?list=30under30-asia-media-marketing-advertising#208e305df7fe)荣冠
和荣获韩国电子信息奥林匹克奖项的精英份子组建而成。多年的业界经验教会了我们懂得如何建立与运营一个用户忠实度高和对奖励机制反馈度高的网络社区，
同时，我们将集中打造生态社区内的用户体验，从更大程度上发展用户量，Muzika（MZK）将在其生态区块链社区内所有经济交易活动中被视为唯一认可的代币并将得到广泛的使用。
`
      },
      {
        Q: 'Muzika的发展愿景是什么？',
        A: `
我们将建立一个全新的分布式数字音乐生态系统，在改革传统音乐产业中利润分配体制的同时，完成与实现音乐制品在制作、
分销与消费的循环周期中的自动化升级，以此推动Muzika在全球数字音乐产业领域中对重塑市场新秩序的影响力。`
      },
      {
        Q: 'Muzika是建立在什么公链的基础上？Muzika是分布式应用（DApp）,协议（Protocol）, 还是产业链（Industry Chain）？',
        A: 'Muzika建立在以太坊公链的基础上（ERC 20），朝着分布式应用（DApp）的方向进展的。'
      },
      {
        Q: '为什么Muzika要运用区块链技术，而不是简单的奖励机制就可以满足的？',
        A: `
对于参加过Muzika平台上进行的活动，或是对Muzika平台有贡献的社区成员，Muzika音乐生态系统允许社区成员获得忠诚度积分（LP）作为奖励。 
同时，LP可以定期转换为MZK代币。所以，我们需要建立一个逻辑框架来进行用户从LP到MZK代币的转换。

智能合约是一个很有效的方法，可以确保转换的透明度及系统性。为了成功实现这一转换，我们需要在同一区块链网络中处理LP和MZK，
包括可获得LP的参与社区活动（做出贡献）的记录。在区块链上记录所有相关的信息可以确保数据的透明，以及防止任何LP作假的可能性。

当Muzika平台上出现一个交易时，一部分MZK代币将会被消耗作为社区维护的服务费，包括LP向MZK的转换。我们将建立一个逻辑框架，
能够根据用户的LP持有数量，定期自动向用户分配相应累计到的MZK。

如果不使用区块链来进行以上过程，我们必须使用AWS云服务器上的数据库，或是我们自己的代币钱包来管理MZK（被收取的服务费）和LP。然而，这一方法会出现以下两个问题：

1. LP持有量被操纵的可能性: 如果我们的数据库被黑客袭击或是被内部开发者滥用，关于LP持有量的资料就会被操纵或篡改。这样的可能性将会导致社区成员对于LP和MZK管理可信度存有疑问。
2. 在分配逻辑上缺乏透明度: 如果在开发者的钱包内收取服务费，则分配逻辑仅由开发者的计算机操作。在这种情况下，即使逻辑本身对公众开放，也不能保证逻辑实际上按编码运行。

如果采用智能合约，我们就不需要担心这些问题。我们可以将MZK（收取服务费）储存在智能合约上，建立一个MZK分配逻辑，以及定期根据用户持有的LP数量来派发相应的MZK。
`
      },
      {
        Q: '什么是 Muzika努力建造的区块链技术？',
        A: `
我们的目标是建立一个数字音乐生态系统，并已在Ontology本体上成功开发了签名逻辑。另外，在无需将私钥发送给我们的情况下，
ONT本体钱包所有者的身份就可以在我们的服务器中获得验证。同时对于ONT钱包用户，我们所做的将会使智能合约的通信处理变得更加安全。
我们的智能合约基于Ontology的底层技术， 在不久的将来，Muzika的支付系统将会被整合应用到现有的音乐平台如MyMusicSheet，KPopPiano，Mapianist。
我们的目标是以尽可能最快的方式开发基于区块链协议（以太坊和本体）的音乐DApp（实际应用），而不是将精力集中在协议开发上。并且，我们将投放更多重点在更优质UX / UI的DApp开发上。
`
      },
      {
        Q: 'Muzika与其它区块链项目的不同之处在哪里？',
        A: `
大多数P2P区块链项目集中在支付系统的开发，虽然这也是Muzika的目标之一，但我们的重中之重是集中资源开发与建立生态系统，
因为基础用户量在区块链中具有重要的地位与作用，我们在官方的白皮书中也对MZK代币在社区搭建中的多种用途与功能做了详细的解说。
支付系统是我们整个计划的一部分，我们不仅能在Muzika平台上使用我们开发的支付系统，同时，还能将其推广应用到Mapiacompany公司旗下的其它音乐平台与网站上。
Muzika并非是从零开始的区块链项目，我们的团队具备懂得如何建立与运营一个用户忠实度高和对奖励机制反馈度高的网络社区的经验，
这些都是之前不少区块链项目都不具备的。同时，我们能将公司旗下现有的音乐平台上的用户与已跟我们合作的音乐人的资源“导流”到Muzika平台上。
`
      },
      {
        Q: 'Muzika的优势是什么？',
        A: `
Muzika生态系统是建立在现存商业运作模式平台的基础上，这些平台包括：  
Mapianist (www.mapianist.com)  
MyMusicSheet (www.mymusicsheet.com)  
KPopPiano (www.kpoppiano.com)   
多年的业界经验教会了我们懂得如何建立与运营一个用户忠实度高和对奖励机制反馈度高的网络用户社区。我们的优势可大致分为以下三点：

**团队优势**

1. Muzika是一支具有凝聚力的团队，通过过去的考验验证了我们的实力与彼此间的相互信任。我们的团队包括7名顶尖的开发人员，他们历经岁月与磨练的考验，证明了自己在Muzika项目上的执行力与奉献精神。 
2. 尽管团队创始人相对年轻，却得到了包括KAKAO和NAVER在内的国内外知名技术企业和福布斯等全球媒体的认可，在关键时刻，我们总能做到力挽狂澜，迎刃而解。  
3. 团队具备了全球商务所需的最高水平的开发能力、最高水平的外语能力以及全球商务经验与人脉。

**技术优势**

团队顶尖人才队伍中包括7名研发人员，他们都精通不同领域的技术。负责带领这7名研发人员的就是Mapiacompany公司的CTO和区块链技术研发总工程师，
这两位的资料在我们官方的白皮书中都有介绍。他们两位的声誉、能力和成就在同一代人与区块链领域中都是顶尖的佼佼者。
不夸地表达，我们的两位顶级项目领导者和研发团队拥有不亚于全球现有任何音乐区块链团队的技术优势。

**全球化优势**

自2015年10月成立以来，Mapiacompany就已经成功地建立了跨国平台，数百万用户和数千名音乐人在这里共享并交换他们的音乐理念、表演视频、音乐乐谱和录音文件。
我们的平台拥有全球一流的版权保护、商业交易和推荐算法，这些都是专门针对数字音乐交易而优化的。Muzika从诞生开始就是一个全球性的项目。
我们与全球音乐人合作，迎合全球粉丝的需求，并且与我们现有的基础平台保持同步。
`
      },
      {
        Q: '是否会有知名的音乐艺人支持Muzika代币呢？',
        A: `
我们将从公司旗下现有平台上得到首批音乐艺人对Muzika的支持，他们包括音乐作品翻唱艺人（翻版作品艺术家），乐器演奏音乐艺人，Youtube视频网站网红明星等，
在公司旗下运营的网站平台[MMS](https://www.mymusicsheet.com/main)上可浏览到部分相关音乐人的信息。同时，我们具备发挥明星效应的执行能力，在项目发展到必要阶段，我们将会考虑相关适合的方案。
`
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
