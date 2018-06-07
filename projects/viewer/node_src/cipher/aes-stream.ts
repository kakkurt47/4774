/**
 * This class supports stream to encrypt or to decrypt by AES.
 */

import * as aesjs from 'aes-js';
import {Transform} from 'stream';


export class AESCBCEncryptionStream extends Transform {
  prevVector: Buffer;
  blockSize: number;
  _aes: any;

  constructor(key, iv, options) {
    super(options);
    this.prevVector = iv;
    this.blockSize = iv.length;
    this._aes = new aesjs.AES(key);
  }

  _transform(data, encoding, callback) {
    // if the data length is not multiplied by vector size
    if (data.length % this.blockSize) {
      callback(new Error(`invalid data length (data length : ${data.length})`), null);
    }

    for (let i = 0; i < data.length; i += this.blockSize) {
      // block XOR with previous vector
      for (let j = 0; j < this.blockSize; ++j) {
        data[i + j] ^= this.prevVector[j];
      }

      // block encryption
      this.prevVector = Buffer.from(this._aes.encrypt(data.slice(i, i + this.blockSize)));
      this.prevVector.copy(data, i);
    }

    callback(null, data);
  }
}


export class AESCBCDecryptionStream extends Transform {
  prevVector: Buffer;
  blockSize: number;
  _aes: any;

  constructor(key, iv, options) {
    super(options);
    this.prevVector = iv;
    this.blockSize = iv.length;
    this._aes = new aesjs.AES(key);
  }

  _transform(data, encoding, callback) {
    // if the data length is not multiplied by vector size
    if (data.length % this.blockSize) {
      callback(new Error(`invalid data length (data length : ${data.length})`), null);
    }

    for (let i = 0; i < data.length; i += this.blockSize) {
      const cipherBlock = Buffer.from(data.slice(i, i + this.blockSize));

      // block decryption
      Buffer.from(this._aes.decrypt(cipherBlock)).copy(data, i);

      // block XOR with previous vector
      for (let j = 0; j < this.blockSize; ++j) {
        data[i + j] ^= this.prevVector[j];
      }

      this.prevVector = cipherBlock;
    }

    callback(null, data);
  }
}

