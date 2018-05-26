import {CommunityPost, SheetPost, User, VideoPost} from '@muzika/core';
import {UsersMock} from './users';

/* tslint:disable */
const contentHtmlMock = `
<div>
   <h1>Baculum aut dea obliquis conchis hac iram</h1>
   <h2>Fama illi per posse dentibus at creatus</h2>
   <p>Lorem markdownum responsa <a href="http://dissipat-pars.org/peteretipso.php">aequor</a>, in bos pater florebat et articulos ideoque crescunt, ortus passimque nefanda <strong>fatifero</strong>? Erysicthone quinquennem quisque loqui saxum unca ingrato partem consulit miseranda induit, dolor, deae. Editus utque est erit <strong>audit studioque quae</strong>: et vacuus parabat nostris! Obliquum omnesque, roganti scitis me verum.</p>
   <blockquote>
      <p>Per nervo multorum, tu pati, flammaeque iuvit, quod aer harenas, hauriret. A cretus fateor marito, canit profugam Cyllenide apicemque neque draconi <strong>belua</strong> digreditur rore <strong>ad</strong> splendidior! Virgine <a href="http://viridesque.net/rotaveoceano">quoque et</a> coluit dies, sua cum <a href="http://amore-augustae.com/crepuscula">de</a> gravem saxificos testantur de inane. Motis confundimur ossa, nunc ego declinet animis plantis inter adunca, arduus bella quid secedere decipienda favillae dato? Obnoxia si lucis occubuit spectat.</p>
   </blockquote>
   <h2>Erat obvius erat gelidus ensem</h2>
   <p>Duo coronat ora regem stupuit palmas, timuit Temesesque quam accipit Gorgoneas salve deseruit. Aetasque sacrorum caelo et cervix, est loco axis nostra res. Ferenda sub figuris spargimur <em>quibus speciosaque ictu</em>, aera varios laurus vestigia, et est iam serviet pro et. Nunc rudem annos ait nexis et sanguine ignes ab omnia fuit tibia deceat profundum adsumere. Stipite <em>adventu increpuit carina</em> iterumque adspexisse fiunt, toto Mareoticaque quid optima intra, silva respiramina fatebor.</p>
   <h2>Orba haut caelesti heu Cyllene tibi</h2>
   <p>Agros non Calliope aeque tenus oris adversa vires iamque inductas admovit. Loci ingemis toris Titan exitium currus posses fatis verborum; di. Pars iuvat, effugit fremebundus visu <strong>ficto</strong>: inviti, arcus, obortae, tui artus, sanguine ante: alta. Tenebat <strong>principio duritiam oculi</strong> permansit Amuli proxima.</p>
   <pre>errorPhishingWildcard = gatePortMacro(3 + read);
if (trojan_powerpoint_dock &gt; root_html + png_pci_nic) {
    p -= adapterPanelPrebinding;
}
rt_trinitron += sdInteractiveCore(appletHdmi(recycle, 1, hashtag_scroll_wan),
        dashboard_eup) - warm_archive(vram_kindle_variable);
</pre>
   <h2>Modusque populos ferre</h2>
   <p>De ut Thetis albescere repagula, quod ducibusque verticis ramum amarunt praestantissima natusque ut prior, <a href="http://usa.io/ungula.html">pontus</a>, membra. Tmolus manibus, dignatus si vulnus Io <a href="http://sol.net/">sub fecisti</a>, est pestiferaque immo pressit aethera; quae Phorbas. Portasse nocte, novat haec. Sorores ara tuta, elige.</p>
   <h2>Animam hunc quamvis petit</h2>
   <p>Inprudens utere adplicor, inplent relevere tenues ora creatum aurea! I <a href="http://tantum-arma.net/tepidosducentem">vincla memorat tenebat</a>, patriam pater, et iam infamis sunt mea <em>rursus</em>.</p>
   <p>Ad arduus, umbras rictu, lectos pulcherrima et nata ab. Iste non aevo ventos fugis facinus, ego in vitataque pater adiecisse et imperat. Furori tuo certare veteres vulnere fulgorem. India tergo aliter fuisses quoniam, in nec caput, parientis.</p>
   <p>Deprendere finitimi Theseus non forma urbem celebratior vagantem posset et lecti, inmurmurat. Quem Dianae placidique extentum undas pallidaque pectora, mea plumis. Lacrimosa et cadet frustra, coepit? Grates non currat digitoque viscera, Minervae qui.</p>
</div>
`;

function createCommunity(post_id: number, title: string, author: User): CommunityPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    post_id,
    title,
    author,
    content: contentHtmlMock,
    views: rand(),
    likes: rand(),
    comments: rand(),
    commentList: [],
    tags: []
  };
}

function createVideo(post_id: number, title: string, author: User): VideoPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    post_id,
    title,
    author,
    content: contentHtmlMock,
    views: rand(),
    likes: rand(),
    comments: rand(),
    commentList: [],
    tags: [],
    videoThumb: null,
    youtubeUrl: null
  };
}

function createSheet(post_id: number, title: string, author: User): SheetPost {
  const rand = () => Math.floor(Math.random() * 100);
  return {
    post_id,
    title,
    author,
    content: contentHtmlMock,
    views: rand(),
    likes: rand(),
    comments: rand(),
    commentList: [],
    tags: [],
    price: rand() * 100
  };
}

export const BestPostsMock: CommunityPost[] = [
  createCommunity(1, 'Community Open!', UsersMock[1]),
  createCommunity(2, 'Welcome to Muzika World', UsersMock[1]),
  createCommunity(3, 'Sell your own sheets', UsersMock[2]),
  createCommunity(4, 'Post Yourself', UsersMock[3]),
];

export const CommunityPostsMock: CommunityPost[] = [
  createCommunity(1, 'vulputate dignissim suspendisse in', UsersMock[3]),
  createCommunity(2, 'praesent semper feugiat nibh', UsersMock[2]),
  createCommunity(3, 'faucibus in ornare quam', UsersMock[1]),
  createCommunity(4, 'tortor aliquam nulla facilisi', UsersMock[1]),
  createCommunity(5, 'nunc scelerisque viverra mauris', UsersMock[2]),
  createCommunity(6, 'dolor morbi non arcu', UsersMock[3]),
  createCommunity(7, 'orci nulla pellentesque dignissim', UsersMock[3]),
  createCommunity(8, 'diam maecenas sed enim', UsersMock[2]),
  createCommunity(9, 'elit ullamcorper dignissim cras', UsersMock[1]),
  createCommunity(10, 'pharetra magna ac placerat', UsersMock[1]),
  createCommunity(11, 'nullam non nisi est', UsersMock[2]),
];

export const VideoPostsMock: VideoPost[] = [
  createVideo(1, 'Contrary to popular belief', UsersMock[1]),
  createVideo(2, 'Lorem Ipsum available', UsersMock[2]),
  createVideo(3, 'the Internet tend to repeat', UsersMock[1]),
  createVideo(4, 'alteration in some form', UsersMock[3]),
  createVideo(5, 'Various versions have evolved', UsersMock[1]),
  createVideo(6, 'Morbi porttitor est', UsersMock[2]),
  createVideo(7, 'Proin dictum, ex', UsersMock[2]),
  createVideo(8, 'Phasellus iaculis enim', UsersMock[3]),
  createVideo(9, 'Sed vitae enim a', UsersMock[3]),
  createVideo(10, 'Nullam vel nisl vulputate', UsersMock[2]),
  createVideo(11, 'Cras pulvinar ipsum luctus', UsersMock[2]),
];

export const SheetPostsMock: SheetPost[] = [
  createSheet(1, 'aliquet sagittis id consectetur', UsersMock[2]),
  createSheet(2, 'nibh venenatis cras sed', UsersMock[1]),
  createSheet(3, 'pellentesque pulvinar pellentesque habitant', UsersMock[1]),
  createSheet(4, 'tincidunt eget nullam non', UsersMock[2]),
  createSheet(5, 'sapien faucibus et molestie', UsersMock[3]),
  createSheet(6, 'lacus sed turpis tincidunt', UsersMock[3]),
  createSheet(7, 'mauris pharetra et ultrices', UsersMock[3]),
  createSheet(8, 'cras fermentum odio eu', UsersMock[2]),
  createSheet(9, 'lorem ipsum dolor sit', UsersMock[3]),
  createSheet(10, 'amet nisl suscipit adipiscing', UsersMock[1]),
  createSheet(11, 'volutpat lacus laoreet non', UsersMock[1]),
];
