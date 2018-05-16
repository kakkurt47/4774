"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var fs_extra_1 = require("fs-extra");
var glob = require("glob");
var path_1 = require("path");
var prettier = require("prettier");
var abiParser_1 = require("./abiParser");
var copyRuntime_1 = require("./copyRuntime");
var generateSource_1 = require("./generateSource");
var parseArgs_1 = require("./parseArgs");
var utils_1 = require("./utils");
var blue = chalk_1.default.blue, red = chalk_1.default.red, green = chalk_1.default.green, yellow = chalk_1.default.yellow;
var cwd = process.cwd();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var options, matches, prettierConfig, runtimeFilename, runtimePath, indexPath, importString, contractNames, indexFileContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = parseArgs_1.parseArgs();
                    matches = glob.sync(options.glob, { ignore: 'node_modules/**', absolute: true });
                    if (matches.length === 0) {
                        // tslint:disable-next-line
                        console.log(red("Found " + matches.length + " ABIs."));
                        process.exit(0);
                    }
                    // tslint:disable-next-line
                    console.log(green("Found " + matches.length + " ABIs."));
                    return [4 /*yield*/, prettier.resolveConfig(path_1.dirname(matches[0]))];
                case 1:
                    prettierConfig = _a.sent();
                    if (prettierConfig) {
                        // tslint:disable-next-line
                        console.log("Found prettier config file");
                    }
                    // tslint:disable-next-line
                    console.log("Generating typings...");
                    runtimeFilename = 'typechain-runtime.ts';
                    runtimePath = path_1.join(options.outDir || path_1.dirname(matches[0]), runtimeFilename);
                    indexPath = path_1.join(options.outDir || path_1.dirname(matches[0]), 'index.ts');
                    copyRuntime_1.copyRuntime(runtimePath);
                    // tslint:disable-next-line
                    console.log(blue(runtimeFilename + " => " + runtimePath));
                    // generate wrappers
                    if (!fs_extra_1.pathExistsSync(path_1.join(options.outDir, 'interface'))) {
                        fs_1.mkdirSync(path_1.join(options.outDir, 'interface'));
                    }
                    importString = [];
                    contractNames = [];
                    matches.forEach(function (p) {
                        var contractName = processFile(p, options.force, runtimePath, __assign({}, (prettierConfig || {}), { parser: 'typescript', singleQuote: true }), options.outDir, options.contracts);
                        if (contractName) {
                            contractNames.push(contractName);
                            importString.push("import { I" + contractName + ", Truffle" + contractName + " } from './interface/" + contractName + "';");
                        }
                    });
                    indexFileContent = "/* GENERATED BY TYPECHAIN VER. " + utils_1.getVersion() + " */\n/* tslint:disable */\nimport { isPlatformBrowser } from '@angular/common';\nimport { InjectionToken, PLATFORM_ID, Provider } from '@angular/core';\nimport { WEB3 } from '../web3.provider';\nimport { Web3 } from '../types/web3';\nimport { TruffleContract } from './typechain-runtime';\n\n" + importString.join('\n') + "\n\n" + contractNames.map(function (name) { return "export { I" + name + ", Truffle" + name + " } from './interface/" + name + "'"; }).join(';\n') + "\n\nlet ProviderFactory = (contractFunction: () => TruffleContract<any>) => {\n  return (web3: Web3, platformId: string) => {\n    if (isPlatformBrowser(platformId)) {\n      let contract: TruffleContract<any> = contractFunction();\n      web3.onProviderChange().subscribe(provider => {\n        if (!!provider) {\n          contract.setProvider(provider);\n        }\n      });\n      return contract;\n    }\n\n    // @TODO is that works?\n    return null;\n  };\n};\n\n" + contractNames.map(function (name) { return "export const " + name + " = new InjectionToken<TruffleContract<I" + name + ">>('" + name + "')"; }).join(';\n') + ";\n\nexport const ContractProviders: Provider[] = [\n" + contractNames.map(function (name) { return "  { provide: " + name + ", useFactory: ProviderFactory(Truffle" + name + "), deps: [WEB3, PLATFORM_ID] }"; }).join(',\n') + "\n];\n";
                    fs_1.writeFileSync(indexPath, indexFileContent);
                    return [2 /*return*/];
            }
        });
    });
}
function processFile(absPath, forceOverwrite, runtimeAbsPath, prettierConfig, fixedOutputDir, allowedContracts) {
    var relativeInputPath = path_1.relative(cwd, absPath);
    var parsedInputPath = path_1.parse(absPath);
    var filenameWithoutAnyExtensions = getFilenameWithoutAnyExtensions(parsedInputPath.name);
    var outputDir = fixedOutputDir || parsedInputPath.dir;
    var outputDirInterface = path_1.join(outputDir, 'interface');
    var outputPath = path_1.join(outputDirInterface, filenameWithoutAnyExtensions + '.ts');
    var relativeOutputPath = path_1.relative(cwd, outputPath);
    var runtimeRelativePath = getRelativeModulePath(outputDirInterface, runtimeAbsPath);
    // tslint:disable-next-line
    console.log(blue(relativeInputPath + " => " + relativeOutputPath));
    if (fs_extra_1.pathExistsSync(outputPath) && !forceOverwrite) {
        // tslint:disable-next-line
        console.log(red("File exists, skipping"));
        return;
    }
    var abiString = fs_1.readFileSync(absPath).toString();
    var rawAbi = abiParser_1.extractAbi(abiString);
    if (rawAbi.length === 0) {
        // tslint:disable-next-line
        console.log(yellow("ABI is empty, skipping"));
        return;
    }
    if (allowedContracts.length > 0 && allowedContracts.indexOf(filenameWithoutAnyExtensions) == -1) {
        // tslint:disable-next-line
        console.log(yellow("Do not want to compile this contract, skipping"));
        return;
    }
    var typescriptSourceFile = generateSource_1.generateSource(rawAbi, {
        fileName: filenameWithoutAnyExtensions,
        relativeRuntimePath: runtimeRelativePath,
        relativeInputPath: getRelativePathOfABI(outputDirInterface, relativeInputPath)
    });
    fs_1.writeFileSync(outputPath, prettier.format(typescriptSourceFile, prettierConfig));
    return filenameWithoutAnyExtensions;
}
function getFilenameWithoutAnyExtensions(filePath) {
    var endPosition = filePath.indexOf('.');
    return filePath.slice(0, endPosition !== -1 ? endPosition : filePath.length);
}
function getRelativeModulePath(from, to) {
    // @note: this is probably not the best way to find relative path for modules
    return path_1.relative(from, to).replace('.ts', '').replace(/\\/g, '/');
}
function getRelativePathOfABI(outDir, abiPath) {
    return path_1.relative(outDir, abiPath).replace(/\\/g, '/');
}
main().catch(function (e) {
    // tslint:disable-next-line
    console.error(red("Error occured: ", e.message));
    process.exit(1);
});
