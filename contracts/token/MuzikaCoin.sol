pragma solidity ^0.4.23;

import '../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import '../../zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol';
import "../../zeppelin-solidity/contracts/lifecycle/Pausable.sol";


// @TODO Support Freeze account
contract MuzikaCoin is MintableToken, BurnableToken, Pausable {
  string public name = 'MUZIKA COIN';
  string public symbol = 'MZK';
  uint8 public decimals = 18;

  uint256 public frozenSupply;

  event FreezeAddress(address indexed target);
  event UnfreezeAddress(address indexed target);

  mapping (address => bool) public frozenAddress;

  modifier onlyNotFrozenAddress(address _target) {
    require(!frozenAddress[_target], 'The address is frozen');
    _;
  }

  modifier onlyFrozenAddress(address _target) {
    require(frozenAddress[_target], 'The address is not frozen');
    _;
  }

  constructor(uint256 initialSupply) public {
    totalSupply_ = initialSupply;
    balances[msg.sender] = initialSupply;
    frozenSupply = 0;
    emit Transfer(0x0, msg.sender, initialSupply);
  }

  function freezeAddress(address _target) public onlyOwner onlyNotFrozenAddress(_target) {
    frozenSupply = frozenSupply.add(balances[_target]);
    frozenAddress[_target] = true;

    emit FreezeAddress(_target);
  }

  function unfreezeAddress(address _target) public onlyOwner onlyFrozenAddress(_target) {
    frozenSupply = frozenSupply.sub(balances[_target]);
    delete frozenAddress[_target];

    emit UnfreezeAddress(_target);
  }

  function burn(uint256 _amount) public onlyOwner {
    super.burn(_amount);
  }

  function transfer(
    address _to,
    uint256 _value
  ) public onlyNotFrozenAddress(msg.sender) whenNotPaused returns (bool) {
    return super.transfer(_to, _value);
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public onlyNotFrozenAddress(_from) onlyNotFrozenAddress(msg.sender) whenNotPaused returns (bool) {
    return super.transferFrom(_from, _to, _value);
  }

  function approve(
    address _spender,
    uint256 _value
  ) public onlyNotFrozenAddress(msg.sender) whenNotPaused returns (bool) {
    return super.approve(_spender, _value);
  }

  function increaseApproval(
    address _spender,
    uint _addedValue
  ) public onlyNotFrozenAddress(msg.sender) whenNotPaused returns (bool) {
    return super.increaseApproval(_spender, _addedValue);
  }

  function decreaseApproval(
    address _spender,
    uint _subtractedValue
  ) public onlyNotFrozenAddress(msg.sender) whenNotPaused returns (bool) {
    return super.decreaseApproval(_spender, _subtractedValue);
  }
}
