const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const studioMainPath = path.join(projectRoot, 'projects', 'studio-main');

if (!fs.existsSync(path.join(studioMainPath, 'renderer'))) {
  fs.symlinkSync(path.join(projectRoot, 'dist', 'muzika-studio-renderer'), path.join(studioMainPath, 'renderer'), 'junction');
}
