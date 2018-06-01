import {ipcMain, BrowserWindow} from 'electron';

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pong';
// });

class IpcWalletService {
  constructor() {
  }

  init() {
    /* For getAccounts */
    ipcMain.on('Wallet:getAccounts', (event) => {
      // Request wallet application getting accounts
      event.sender.send('Wallet:getAccounts:request');
    });

    ipcMain.on('Wallet:getAccounts:received', (event, error, accounts) => {
      // On receive accounts
      event.sender.send('Wallet:getAccounts', error, accounts);
    });

    /* For signTransaction */
    ipcMain.on('Wallet:signTransaction', (event, txData) => {
      event.sender.send('Wallet:signTransaction:request', txData);
    });

    ipcMain.on('Wallet:signTransaction:received', (event, error, signed) => {
      event.sender.send('Wallet:signTransaction', error, signed);
    });

    /* For signPersonalMessage */
    ipcMain.on('Wallet:signPersonalMessage', (event, msgParams) => {
      event.sender.send('Wallet:signPersonalMessage:request', msgParams);
    });

    ipcMain.on('Wallet:signPersonalMessage:received', (event, error, signed) => {
      event.sender.send('Wallet:signPersonalMessage', error, signed);
    });
  }
}

export const IpcWalletServiceInstance = new IpcWalletService();
