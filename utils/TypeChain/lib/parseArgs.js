"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commandLineArgs = require("command-line-args");
var fs_1 = require("fs");
var path_1 = require("path");
var DEFAULT_GLOB_PATTERN = '**/*.abi';
function parseArgs() {
    var optionDefinitions = [
        { name: 'force', alias: 'f', type: Boolean },
        { name: 'glob', type: String, defaultOption: true },
        { name: 'outDir', type: String },
        { name: 'configPath', alias: 'p', type: String },
    ];
    var rawOptions = commandLineArgs(optionDefinitions);
    var configPath = rawOptions.configPath;
    var config = {};
    if (configPath) {
        var raw = JSON.parse(fs_1.readFileSync(configPath).toString());
        var baseDir = raw.baseDir || '.';
        var outDir = raw.outDir ? path_1.relative(baseDir, raw.outDir) : null;
        var glob = path_1.relative(baseDir, raw.glob);
        config = {
            force: !!raw.force,
            glob: glob || DEFAULT_GLOB_PATTERN,
            outDir: outDir,
            contracts: raw.contracts || [],
        };
    }
    else {
        config = Object.assign(config, {
            force: !!rawOptions.force,
            glob: rawOptions.glob || DEFAULT_GLOB_PATTERN,
            outDir: rawOptions.outDir
        });
    }
    return config;
}
exports.parseArgs = parseArgs;
