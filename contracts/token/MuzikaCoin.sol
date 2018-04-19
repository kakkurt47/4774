pragma solidity ^0.4.22;

import '../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

// @TODO Support Freeze account
contract MuzikaCoin is MintableToken {
    string public name = "MUZIKA COIN";
    string public symbol = "MZK";
    uint8 public decimals = 18;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor(uint initialSupply) public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = initialSupply;
        emit Transfer(0x0, msg.sender, initialSupply);
    }
}
