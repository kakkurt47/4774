import * as crypto from 'crypto';
import {Block} from './block';
import * as aesjs from 'aes-js';


export class BlockRequest {
  blockHash: string;
  publicKey: any;

  constructor(blockHash, publicKey) {
    this.blockHash = blockHash;
    this.publicKey = publicKey;
  }

  encrypt(block: Block) {
    const encryptedBlock = new Block(block.data, block.isPadded());
    encryptedBlock.pad();

    // generate random AES key and IV
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const aesCbc = new aesjs.ModeOfOperation.cbc(aesKey, iv);
    const encryptedData = aesCbc.encrypt(encryptedBlock.data);

    // encrypt AES key by public key
    encryptedBlock.data = Buffer.concat([iv, encryptedData]);
    encryptedBlock.encryptedKey = this.publicKey.encrypt(aesKey);
    return encryptedBlock;
  }
}
