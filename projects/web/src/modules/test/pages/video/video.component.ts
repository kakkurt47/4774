import {AfterViewInit, Component} from '@angular/core';
import {BaseComponent} from '@muzika/core/angular';
import {MuzikaHLSLoader} from '@muzika/core/browser';
import * as Hls from 'hls.js';


@Component({
  selector: 'app-page-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoPageComponent extends BaseComponent implements AfterViewInit {
  // encrypted streaming file and AES key for test
  testHash = 'QmYbGHJibZK3SEZZZYZc7eYp4kmVio2aor3iimUUkbmrjH';
  aesKey = Buffer.from([
    0x08, 0x05, 0x31, 0x03, 0x77, 0x19, 0xaa, 0x2e,
    0xd0, 0x69, 0xcd, 0xc2, 0x97, 0xaa, 0xf1, 0xee,
    0x24, 0xb6, 0x27, 0x9e, 0x63, 0x9d, 0xf5, 0x5a,
    0xcf, 0x09, 0x9e, 0xa3, 0x9d, 0xca, 0x2f, 0xb9
  ]);

  constructor() {
    super();
  }

  ngAfterViewInit() {
    Hls.DefaultConfig.loader = MuzikaHLSLoader;
    Hls.DefaultConfig.debug = false;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.config.ipfsHash = this.testHash;
      hls.config.fileName = '[Lyric video] Love Me Now - VIEW(최종).mp4';
      hls.config.cipherKey = this.aesKey;
      hls.loadSource('master.m3u8');
      // let video = null;
      const video: HTMLMediaElement = document.querySelector('#videoTest');
      hls.attachMedia(video);
      // TODO: Error Handling (Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.)
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }

  }
}
