import {Block, BlockUtil} from './block';
import * as ursa from 'ursa';


export class BlockKey {
  block: Block;
  privateKey: any;
  publicKey: any;
  encryptedAESKey: Buffer = null;

  private constructor(block: Block, publicKey: any = null) {
    this.block = block;
    if (!publicKey) {
      this.generateKey();
    } else {
      this.publicKey = publicKey;
      this.encryptAESKey();
    }
  }

  static forResponse(block: Block, publicKey: any) {
    // create a block key for response
    return new BlockKey(block, publicKey);
  }

  static forRequest(block: Block = null) {
    // create a block key for request server to send encrypted AES key.
    return new BlockKey(block);
  }

  generateKey() {
    // creates a 2048 bit RSA key
    const rsaKey = ursa.generatePrivateKey(BlockUtil.RSA_KEY_BIT_SIZE, 65537);
    this.privateKey = rsaKey;
    this.publicKey = rsaKey;
  }

  getPrivateKey() {
    return this.privateKey.toPrivatePem().toString();
  }

  getPublicKey() {
    return this.publicKey.toPublicPem().toString();
  }

  _encryptByPublicKey(blob: Buffer) {
    return this.publicKey.encrypt(blob);
  }

  _decryptByPrivateKey(blob: Buffer) {
    return this.privateKey.decrypt(blob);
  }

  getEncryptedAESKey() {
    if (!this.encryptedAESKey) {
      this.encryptAESKey();
    }
    return this.encryptedAESKey;
  }

  encryptAESKey() {
    if (!this.block || !this.block.isEncrypted()) {
      // if aes key is not set since the block is not encrypted, cannot encrypt
      throw new Error('The block is not encrypted');
    } else {
      this.encryptedAESKey = this._encryptByPublicKey(this.block.aesKey);
    }
  }

  decryptAESKey() {
    if (!this.block) {
      throw new Error('The block does not exist.');
    } else {
      this.block.aesKey = this._decryptByPrivateKey(this.encryptedAESKey);
    }
  }

  receiveBlob(blob: Buffer, doDecryption: boolean = true) {
    // receive blob and translate block.
    this.encryptedAESKey = blob.slice(0, BlockUtil.RSA_KEY_BIT_SIZE / 8);

    // generate an encrypted block from binary
    this.block = Block.fromEncryptedData(blob.slice(BlockUtil.RSA_KEY_BIT_SIZE / 8));
    this.decryptAESKey();

    if (doDecryption) {
      this.block.decrypt();
    }
  }

  sendBlob() {
    return Buffer.concat([this.getEncryptedAESKey(), this.block.data]);
  }
}
