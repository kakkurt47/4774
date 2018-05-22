/* tslint:disable */
import { BigNumber } from "bignumber.js";

export type TxValue = number | string | BigNumber;
export type EtherInteger = number | string | BigNumber;
export type EtherAddress = string | BigNumber;

export interface RawAbiParameter {
  name: string;
  type: string;
}

export interface RawAbiDefinition {
  name: string;
  constant: boolean;
  payable: boolean;
  inputs: RawAbiParameter[];
  outputs: RawAbiParameter[];
  stateMutability: string;
  type: string;
}

export interface ITxParams {
  from?: string;
  to?: string;
  data?: string;
  value?: TxValue;
  gas?: TxValue;
  gasPrice?: TxValue;
}

// @TODO
export class TruffleContract<T extends TruffleContractInstance> {
  abi: RawAbiDefinition;
  address: string;

  'new'(...args: any[]): Promise<T> {
    throw new Error('Not Implemented');
  };
  at(address: string): T {
    throw new Error('Not Implemented');
  };
  deployed(): Promise<T> {
    throw new Error('Not Implemented');
  };
  detectNetwork(): Promise<void> {
    throw new Error('Not Implemented');
  };
  setNetwork(networkID: number): void {
    throw new Error('Not Implemented');
  };
  resetAddress(): void {
    throw new Error('Not Implemented');
  };
  setProvider(provider: any): void {
    throw new Error('Not Implemented');
  };
}

// @TODO
export interface TruffleContractInstance {
  abi: RawAbiDefinition;
  address: string;
  contract: any;

  sendTransaction(txParams: ITxParams): Promise<any>;
  send(value: EtherInteger): Promise<any>;
}

