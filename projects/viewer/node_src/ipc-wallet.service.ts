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
    ipcMain.on('Wallet:getAccounts', (event, uuid) => {
      // Request wallet application getting accounts
      event.sender.send('WalletProvider:getAccounts', uuid);
    });

    ipcMain.on('WalletProvider:getAccounts', (event, uuid, error, accounts) => {
      // On receive accounts
      event.sender.send(this.wrap('Wallet:getAccounts', uuid), error, accounts);
    });

    /* For signTransaction */
    ipcMain.on('Wallet:signTransaction', (event, uuid, txData) => {
      event.sender.send('WalletProvider:signTransaction', uuid, txData);
    });

    ipcMain.on('WalletProvider:signTransaction', (event, uuid, error, signed) => {
      event.sender.send(this.wrap('Wallet:signTransaction', uuid), error, signed);
    });

    /* For signPersonalMessage */
    ipcMain.on('Wallet:signPersonalMessage', (event, uuid, msgParams) => {
      event.sender.send('WalletProvider:signPersonalMessage', uuid, msgParams);
    });

    ipcMain.on('WalletProvider:signPersonalMessage', (event, uuid, error, signed) => {
      event.sender.send(this.wrap('Wallet:signPersonalMessage', uuid), error, signed);
    });
  }

  private wrap(eventName: string, uuid: string) {
    return `${eventName}::${uuid}`;
  }
}

export const IpcWalletServiceInstance = new IpcWalletService();
