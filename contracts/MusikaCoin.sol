pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract MusikaCoin is MintableToken {
  string public name = "MUSIKA COIN";
  string public symbol = "MKC";
  uint8 public decimals = 18;
}