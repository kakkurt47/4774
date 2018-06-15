
import {Transform} from 'stream';


/**
 * Progress interface represents progress in some works. Clients often want to
 * know how the work done.
 */
export interface Progress {
  /**
   * callback function that is called when the percent is changed.
   * @param percent current percent.
   */
  callbackOnProgress: (percent: number) => any;

  /**
   * Returns how the work done.
   * @returns {number} the floating number between 0 and 1. 0 means the work is
   * not started yet and 1 means the work is completely done.
   */
  getProgressPercent(): number;
}

/**
 * ProgressSet represents total progress of works. It has progress array and if
 * all progresses are done, getProgressPercent() function will return 1. And if
 * it doesn't have progresses (progress array is empty), it always return 0.
 */
export class ProgressSet implements Progress {
  callbackOnProgress: (percent: number) => any;
  progresses: Progress[];
  isStarted = false;

  constructor(progresses: Progress[], callbackOnProgress?: (percent) => any) {
    this.progresses = progresses;
    this.callbackOnProgress = callbackOnProgress || ((percent: number) => {});

    this.progresses.forEach((progress) => {
      const originCallback = progress.callbackOnProgress;
      progress.callbackOnProgress = (percent: number) => {
        originCallback(percent);
        this.onChangeChildProgress();
      };
    });
  }

  onChangeChildProgress() {
    if (this.isStarted) {
      this.callbackOnProgress(this.getProgressPercent());
    }
  }

  /**
   * Starts to track this progress. The onProgressCallback that is called when
   * the percentage changed after start() method called.
   */
  start() {
    this.isStarted = true;
    this.callbackOnProgress(this.getProgressPercent());
  }

  /**
   * Adds an additional progress.
   * @param {Progress} progress addtional progress to be tracked.
   */
  registerProgress(progress: Progress) {
    const originCallback = progress.callbackOnProgress;
    progress.callbackOnProgress = (percent: number) => {
      originCallback(percent);
      this.onChangeChildProgress();
    }
    this.progresses.push(progress);
  }

  getProgressPercent(): number {
    // if no progress or not started tracking yet, return 0.
    if (!this.progresses.length || !this.isStarted) {
      return 0;
    }

    let done = 0;
    this.progresses.forEach((progress) => {
      done += progress.getProgressPercent();
    });

    return done / this.progresses.length;
  }
}

/**
 * ManualProgress is a progress that its percent is decided manually by calling
 * function setProgressPercent() function.
 */
export class ManualProgress implements Progress {
  callbackOnProgress: (percent: number) => any;
  percent = 0;

  constructor(callbackOnProgress?: (percent: number) => any) {
    this.callbackOnProgress = callbackOnProgress || ((percent: number) => {});
  }

  /**
   * Sets the percent of the progress.
   * @param {number} percent the percent that represents how work done. It should
   * be between 0 and 1.
   */
  setProgressPercent(percent: number) {
    // if the percent is over 1 or lower than 0, set to boundary.
    if (percent > 1) {
      percent = 1;
    } else if (percent < 0) {
      percent = 0;
    }

    this.percent = percent;
    this.callbackOnProgress(this.percent);
  }

  getProgressPercent(): number {
    return this.percent;
  }
}

/**
 * ProgressStream is a progress that its percent is determined by the length data
 * read and the total length. When constructing, it should have total length in
 * options.
 */
export class ProgressStream extends Transform implements Progress {
  callbackOnProgress: (percent: number) => any;
  totalSize: number;
  readLength = 0;

  constructor(options, callbackOnProgress?: (percent: number) => any) {
    super(options);
    this.totalSize = options.totalSize;
    this.callbackOnProgress = callbackOnProgress || ((percent: number) => {});
  }

  _transform(data, encoding, callback) {
    this.readLength += data.length;
    this.push(data);
    this.callbackOnProgress(this.getProgressPercent());
    callback();
  }

  getProgressPercent(): number {
    return (this.totalSize) ? this.readLength / this.totalSize : 1;
  }
}

