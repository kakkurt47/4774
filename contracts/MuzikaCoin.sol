pragma solidity ^0.4.19;

import '../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract MuzikaCoin is MintableToken {
  string public name = "MUZIKA COIN";
  string public symbol = "MZK";
  uint8 public decimals = 18;
}
