pragma solidity ^0.4.22;

import '../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import '../../zeppelin-solidity/contracts/ownership/Whitelist.sol';

// @TODO Support Freeze account
contract MuzikaCoin is MintableToken, Whitelist {
    string public name = "MUZIKA COIN";
    string public symbol = "MZK";
    uint8 public decimals = 18;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor(uint256 initialSupply) public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = initialSupply;
        emit Transfer(0x0, msg.sender, initialSupply);
    }
    
    /**
    * @dev Transfer tokens from one address to another
    * @param _from address The address which you want to send tokens from
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the amount of tokens to be transferred
    */
    function transferForContract(address _from, address _to, uint256 _value) external returns (bool) {
        require(_to != address(0), 'Cannot transfer to zero-account');
        require(_value <= balances[_from], 'Not enought coins');
        require(whitelist[msg.sender], 'Not in whitelist');

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
}
