
import * as crypto from 'crypto';

export class Block {
  private padded: boolean;

  data: any;
  frontGarbageSize: number;
  encryptedKey: string;
  blockHash: string;

  constructor(data, padded = false, encryptedKey = null) {
    this.data = data;
    this.padded = padded;
    this.encryptedKey = encryptedKey;

    if (this.padded) {
      // if padded, parse front garbage size from data
      this.frontGarbageSize = this.data[0];
    } else {
      this.frontGarbageSize = 0;
    }
  }

  pad() {
    if (this.padded) {
      return;
    }

    // add padding
    const paddingValue = 16 - this.data.length % 16;
    this.data = Buffer.concat([this.data, Buffer.alloc(paddingValue, paddingValue)]);

    // add garbage padding
    const frontGarbageSizeBuffer = crypto.randomBytes(1);
    this.frontGarbageSize = frontGarbageSizeBuffer[0];
    const frontGarbage = crypto.randomBytes(this.frontGarbageSize);
    const backGarbage = crypto.randomBytes(255 - this.frontGarbageSize);

    this.data = Buffer.concat([frontGarbageSizeBuffer, frontGarbage, this.data, backGarbage]);
    this.padded = true;
  }

  unpad() {
    if (!this.padded) {
      return;
    }

    this.frontGarbageSize = this.data[0];
    const backGarbageSize = 255 - this.frontGarbageSize;

    this.data = this.data.slice(1 + this.frontGarbageSize, this.data.length - backGarbageSize);
    this.frontGarbageSize = 0;

    const dataPaddingSize = this.data[this.data.length - 1];
    this.data = this.data.slice(0, this.data.length - dataPaddingSize);
    this.padded = false;
  }

  isPadded() {
    return this.padded;
  }
}
