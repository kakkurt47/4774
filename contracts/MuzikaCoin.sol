pragma solidity ^0.4.21;

import '../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract MuzikaCoin is MintableToken {
  string public name = "MUZIKA COIN";
  string public symbol = "MZK";
  uint8 public decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function MuzikaCoin() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }
}
