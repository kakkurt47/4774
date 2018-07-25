import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { IpcWalletServiceInstance } from './src/ipc-wallet.service';
import { IpcMainServiceInstance } from './src/ipc.service';
import { IpfsServiceInstance } from './src/ipfs.service';
import { StorageServiceInstance } from './src/storage.service';
import { MuzikaConsole } from '@muzika/core';

MuzikaConsole.chalk = require('chalk');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createWindow() {

  const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 1340,
    height: 700,
    minWidth: 700,
    minHeight: 400,
    resizable: true,
    webPreferences: {
      plugins: true,
      nodeIntegration: true
    }
  });

  // disable menu
  win.setMenu(null);

  MuzikaConsole.info('test');

  if (serve) {
    // https://github.com/yan-foto/electron-reload/issues/16
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'renderer/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();

    IpfsServiceInstance.init((serve) ? '' : app.getPath('userData'));
    IpcMainServiceInstance.init();
    IpcWalletServiceInstance.init();
    StorageServiceInstance.init();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
