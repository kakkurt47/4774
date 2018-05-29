

export class BlockRequest {
  blockHash: string;
  publicKey: any;

  constructor(blockHash, publicKey) {
    this.blockHash = blockHash;
    this.publicKey = publicKey;
  }
}
