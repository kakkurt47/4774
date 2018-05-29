
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
  }
}
