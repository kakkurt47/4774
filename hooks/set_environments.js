var replace = require("replace");
var fs = require('fs-extra');
var path = require('path');

// use:
var profile = process.env.ENV || 'dev';

console.log('Moving environment configuration ...');
const projectEnvironmentPath = path.resolve(__dirname, '../projects/viewer/src/environments/');
const targetEnvironmentPath = path.resolve(__dirname,'../projects/viewer/node_src/environment.ts');

switch (profile) {
  case 'prod':
    fs.copySync(path.join(projectEnvironmentPath, 'environment.prod.ts'), targetEnvironmentPath);
    break;
  case 'stage':
    fs.copySync(path.join(projectEnvironmentPath, 'environment.stage.ts'), targetEnvironmentPath);
    break;
  default:
    fs.copySync(path.join(projectEnvironmentPath, 'environment.ts'), targetEnvironmentPath);
}

console.log('Current profile : ' + profile);

replace({
  regex: "const environment",
  replacement: "const electronEnvironment",
  paths: [targetEnvironmentPath],
  recursive: true,
  silent: true,
});
