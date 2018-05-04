import * as commandLineArgs from 'command-line-args';
import {readFileSync} from 'fs';
import {relative} from 'path';

const DEFAULT_GLOB_PATTERN = '**/*.abi';

export interface IOptions {
  glob: string;
  force: boolean;
  outDir?: string;
  contracts?: string[];
}

export function parseArgs(): IOptions {
  const optionDefinitions = [
    { name: 'force', alias: 'f', type: Boolean },
    { name: 'glob', type: String, defaultOption: true },
    { name: 'outDir', type: String },
    { name: 'configPath', alias: 'p', type: String },
  ];

  const rawOptions = commandLineArgs(optionDefinitions);

  const configPath = rawOptions.configPath;

  let config: any = {};
  if (configPath) {
    let raw = JSON.parse(readFileSync(configPath).toString());
    let baseDir = raw.baseDir || '.';
    let outDir = raw.outDir ? relative(baseDir, raw.outDir) : null;
    let glob = relative(baseDir, raw.glob);

    config = {
      force: !!raw.force,
      glob: glob || DEFAULT_GLOB_PATTERN,
      outDir: outDir,
      contracts: raw.contracts || [],
    }
  } else {
    config = Object.assign(config, {
      force: !!rawOptions.force,
      glob: rawOptions.glob || DEFAULT_GLOB_PATTERN,
      outDir: rawOptions.outDir
    });
  }

  return config;
}
