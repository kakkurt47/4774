import {BlockRequest} from './block-request';
import {Block} from './block';
import * as nodeRSA from 'node-rsa';
import * as aesjs from 'aes-js';


export class BlockKey {
  blockHash: string;
  publicKey: any;
  privateKey: any;

  constructor(blockHash: string) {
    this.blockHash = blockHash;
    this.generateKey();
  }

  generateKey() {
    // creates a 2048 bit RSA key
    const rsaKey = new nodeRSA({b: 2048}).generateKeyPair();
    this.privateKey = rsaKey;
    this.publicKey = rsaKey.exportKey('pkcs8-public');
  }

  generateRequest(blockHash) {
    return new BlockRequest(blockHash, this.publicKey);
  }

  decrypt(block: Block) {
    // if not encrypted block
    if (!block.encryptedKey) {
      return null;
    }

    // TODO: check block hash
    // if block hash is not the same
    // if (block.blockHash !== this.blockHash) {
    //   return null;
    // }

    let aesKey = this.privateKey.decrypt(block.encryptedKey);

    // if AES key length is invalid (should be 256 bits)
    if (aesKey.length !== 32) {
      return null;
    }

    // get initializer vector in CBC mode from encrypted data and encrypted data
    let iv = block.data.slice(0, 16);
    let encryptedData = block.data.slice(16);

    aesKey = aesjs.utils.hex.toBytes(aesjs.utils.hex.fromBytes(aesKey));
    iv = aesjs.utils.hex.toBytes(aesjs.utils.hex.fromBytes(iv));
    encryptedData = aesjs.utils.hex.toBytes(aesjs.utils.hex.fromBytes(encryptedData));

    const aesCbc = new aesjs.ModeOfOperation.cbc(aesKey, iv);
    const decryptedData = aesCbc.decrypt(encryptedData);

    const decryptedBlock = new Block(decryptedData, true);
    decryptedBlock.unpad();

    return decryptedBlock;
  }
}
