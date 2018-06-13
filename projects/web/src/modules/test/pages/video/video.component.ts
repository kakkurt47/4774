import {Component} from '@angular/core';
import {BaseComponent, MuzikaHLSLoader} from '@muzika/core';
import * as Hls from 'hls.js';


@Component({
  selector: 'app-page-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoPageComponent extends BaseComponent {
  testHash = 'QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K';

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    Hls.DefaultConfig.loader = MuzikaHLSLoader;
    Hls.DefaultConfig.debug = false;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.config.ipfsPath = this.testHash;
      hls.loadSource('master.m3u8');
      // let video = null;
      const video: HTMLMediaElement = document.querySelector('#videoTest');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }

  }
}
