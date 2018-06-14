import {AfterViewInit, Component} from '@angular/core';
import {BaseComponent, MuzikaHLSLoader} from '@muzika/core';
import * as Hls from 'hls.js';


@Component({
  selector: 'app-page-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoPageComponent extends BaseComponent implements AfterViewInit {
  // encrypted streaming file and AES key for test
  testHash = 'Qmc4VunebDUNGWvUhy58H16wM351grws1gTdKZGQKL2Wg3';
  aesKey = Buffer.from([
      0x5c, 0x26, 0x61, 0x62, 0xbd, 0xe6, 0x2f, 0xd9,
      0xac, 0xc5, 0x82, 0xad, 0x2e, 0x3b, 0xe2, 0x30,
      0xc8, 0x84, 0x73, 0x97, 0xd1, 0xa7, 0x46, 0xa9,
      0x8f, 0xf8, 0x99, 0x92, 0xaa, 0x36, 0x8c, 0x22
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
      hls.config.fileName = '20180513 폴라로이드.wav';
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
