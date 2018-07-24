const fs = require('fs');
const path = require('path');
const shell = require('child_process').execSync;

exports.default = async context => {
  const projectRoot = path.join(__dirname, '..');
  const studioMainPath = path.join(projectRoot, 'projects', 'studio-main');

  console.log('Copy Renderer...');
  if (!fs.existsSync(path.join(studioMainPath, 'renderer'))) {
    shell(`cp -r ${path.join(projectRoot, 'dist', 'muzika-studio-renderer')} ${path.join(studioMainPath, 'renderer')}`);
  }
};
