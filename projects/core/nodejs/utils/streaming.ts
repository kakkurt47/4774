import * as ffmpegStatic from 'ffmpeg-static';
import * as ffprobeStatic from 'ffprobe-static';
import {Observable, throwError} from 'rxjs';
import * as path from 'path';
import {MuzikaConsole} from '@muzika/core';

const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegStatic.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

/**
 * Utils for streaming conversion. It defines several quality of options of streaming convertion for audio and video.
 */
export class StreamingUtil {
  // TODO : setting proper options for several quality.
  public static VIDEO_OPTION = {
    HIGH_QUALITY: [],
    MIDDLE_QUALITY: [
      '-profile:v baseline',    // baseline profile (level 3.0) for H264 video codec
      '-level 3.0',
      '-s 640x360',             // 640px width, 360px height output video dimensions
      '-start_number 0',        // start the first .ts segment at index 0
      '-hls_time 3',            // 3 second segment duration
      '-hls_list_size 0',       // Maxmimum number of playlist entries (0 means all entries/infinite)
      '-f hls'                  // HLS format
    ],
    LOW_QUALITY: []
  };

  public static AUDIO_OPTION = {
    HIGH_QUALITY: [],
    MIDDLE_QUALITY: [
      '-profile:v baseline',    // native FFmpeg AAC encoder
      '-level 3.0',
      '-start_number 0',        // start the first .ts segment at index 0
      '-hls_time 3',            // 3 second segment duration
      '-hls_list_size 0',       // Maxmimum number of playlist entries (0 means all entries/infinite)
      '-f hls'                  // HLS format
    ],
    LOW_QUALITY: []
  };

  /**
   *
   * @param {string} filePath
   * @param {string[]} options
   * @param {string} output
   * @returns {Observable<any>}
   */
  public static convert(filePath: string, options: string[], outputDir: string, masterName?: string): Observable<any> {
    masterName = masterName || 'master.m3u8';

    return Observable.create((observer) => {
        ffmpeg(filePath).addOptions(options).output(path.join(outputDir, masterName))
          .on('error', (err) => {
            MuzikaConsole.error(err);
            return throwError(err);
          })
          .on('progress', (progress) => {
            observer.next(progress);
          })
          .on('end', () => {
            MuzikaConsole.info('End to generate streaming files.');
            observer.complete();
          })
          .run();
    });
  }
}


