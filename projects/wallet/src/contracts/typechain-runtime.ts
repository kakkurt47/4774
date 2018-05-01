/* tslint:disable */
import { BigNumber } from "bignumber.js";

export type TxValue = number | string | BigNumber;
export type EtherInteger = number | BigNumber;
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
export interface TruffleContract<T extends TruffleContractInstance> {
  abi: RawAbiDefinition;
  address: string;

  new(...args: any[]): Promise<T>;
  at(address: string): T;
  deployed(): Promise<T>;
  detectNetwork(): Promise<void>;
  setNetwork(networkID: number): void;
  resetAddress(): void;
  setProvider(provider: any): void;
}

// @TODO
export interface TruffleContractInstance {
  abi: RawAbiDefinition;
  address: string;
  contract: any;

  sendTransaction(txParams: ITxParams): Promise<any>;
  send(value: EtherInteger): Promise<any>;
}

export function promisify(func: any, args: any): Promise<any> {
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) return rej(err);
      return res(data);
    });
  });
}
