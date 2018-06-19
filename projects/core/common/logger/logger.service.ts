import { MuzikaLoggerUtils } from './logger.util';
import { MuzikaLoggerLevel } from './logger.level';

export const Levels = [
  'TRACE',
  'DEBUG',
  'INFO',
  'LOG',
  'WARN',
  'ERROR',
  'OFF'
];

export class MuzikaLogger {
  constructor(private accessLevel: MuzikaLoggerLevel) {
  }

  public trace(message, ...additional: any[]): void {
    this._log(MuzikaLoggerLevel.TRACE, message, additional);
  }

  public debug(message, ...additional: any[]): void {
    this._log(MuzikaLoggerLevel.DEBUG, message, additional);
  }

  public info(message, ...additional: any[]): void {
    this._log(MuzikaLoggerLevel.INFO, message, additional);
  }

  public log(message, ...additional: any[]): void {
    this._log(MuzikaLoggerLevel.LOG, message, additional);
  }

  public warn(message, ...additional: any[]): void {
    this._log(MuzikaLoggerLevel.WARN, message, additional);
  }

  public error(message, ...additional: any[]): void {
    this._log(MuzikaLoggerLevel.ERROR, message, additional);
  }

  private _log(level: MuzikaLoggerLevel, message, additional: any[] = [], logOnServer: boolean = true): void {
    if (!message) {
      return;
    }

    const logLevelString = Levels[level];

    message = MuzikaLoggerUtils.prepareMessage(message);

    // only use validated parameters for HTTP requests
    const validatedAdditionalParameters = MuzikaLoggerUtils.prepareAdditionalParameters(additional);

    const timestamp = new Date().toISOString();

    const callerDetails = MuzikaLoggerUtils.getCallerDetails();

    // if no message or the log level is less than the environ
    if (level < this.accessLevel) {
      return;
    }

    const metaString = MuzikaLoggerUtils.prepareMetaString(timestamp, logLevelString, callerDetails.fileName, callerDetails.lineNumber);

    const color = MuzikaLoggerUtils.getColor(level);

    console.log(`%c${metaString}`, `color:${color}`, message, ...(additional || []));
  }
}

export const MuzikaConsole = new MuzikaLogger(MuzikaLoggerLevel.LOG);
