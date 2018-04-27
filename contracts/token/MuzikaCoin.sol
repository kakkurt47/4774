pragma solidity ^0.4.23;

import '../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import '../../zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol';


// @TODO Support Freeze account
contract MuzikaCoin is MintableToken, BurnableToken {
  string public name = 'MUZIKA COIN';
  string public symbol = 'MZK';
  uint8 public decimals = 18;

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor(uint256 initialSupply) public {
    totalSupply_ = initialSupply;
    balances[msg.sender] = initialSupply;
    emit Transfer(0x0, msg.sender, initialSupply);
  }

  function burn(uint256 _amount) public onlyOwner {
    super.burn(_amount);
  }
}
