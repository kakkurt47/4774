pragma solidity ^0.4.23;

import '../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import '../../zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol';
import '../../zeppelin-solidity/contracts/lifecycle/Pausable.sol';
import '../../zeppelin-solidity/contracts/ECRecovery.sol';


contract MuzikaCoin is MintableToken, BurnableToken, Pausable {
  string public name = 'MUZIKA COIN';
  string public symbol = 'MZK';
  uint8 public decimals = 18;

  uint256 public frozenSupply;

  event FreezeAddress(address indexed target);
  event UnfreezeAddress(address indexed target);

  mapping (address => bool) public frozenAddress;

  mapping (address => uint256) internal _nonce;

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

  /**
   * @dev Freeze account(address)
   *
   * @dev Be careful not to occur overflow in frozenSupply. If it was happened,
   * @dev addresses of anomalies will not be frozen.
   *
   * @param _target The address to freeze
   */
  function freezeAddress(address _target) public onlyOwner onlyNotFrozenAddress(_target) {
    frozenSupply = frozenSupply.add(balances[_target]);
    frozenAddress[_target] = true;

    emit FreezeAddress(_target);
  }

  /**
   * @dev Unfreeze account(address)
   *
   * @param _target The address to unfreeze
   */
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
  )
    public
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    return super.transfer(_to, _value);
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  )
    public
    onlyNotFrozenAddress(_from)
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    return super.transferFrom(_from, _to, _value);
  }

  function approve(
    address _spender,
    uint256 _value
  )
    public
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    return super.approve(_spender, _value);
  }

  function increaseApproval(
    address _spender,
    uint _addedValue
  )
    public
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    return super.increaseApproval(_spender, _addedValue);
  }

  function decreaseApproval(
    address _spender,
    uint _subtractedValue
  )
    public
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    return super.decreaseApproval(_spender, _subtractedValue);
  }

  function getNonce(address _target) public view returns (uint256) {
    return _nonce[_target];
  }

  /**
   * @dev Be careful to use delegateTransfer. If attacker whose balance is less than sum of fee and amount
   * @dev requests constantly transferring using delegateTransfer/delegateApprove to someone,
   * @dev he or she may lose all ether to process these requests.
   */
  function delegateTransfer(
    address _from,
    address _to,
    uint256 _value,
    uint256 _fee,
    bytes _sig
  )
    public
    onlyNotFrozenAddress(_from)
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    uint256 _burden = _value.add(_fee);

    require(_to != address(0), 'Cannot transfer to zero-address');
    require(_burden <= balances[_from], 'Not enough amount to be transferred');

    uint256 nonce = _nonce[_from];
    bytes32 message = keccak256(
      'Transfer',
      _from,
      _to,
      _value,
      _fee,
      nonce
    );
    bytes32 hash = ECRecovery.toEthSignedMessageHash(message);

    require(ECRecovery.recover(hash, _sig) == _from, 'Authorization failed');

    balances[_from] = balances[_from].sub(_burden);

    balances[_to] = balances[_to].add(_value);
    emit Transfer(_from, _to, _value);

    balances[msg.sender] = balances[msg.sender].add(_fee);
    emit Transfer(_from, msg.sender, _fee);

    _nonce[_from] = _nonce[_from].add(1);

    return true;
  }

  function delegateApprove(
    address _from,
    address _spender,
    uint256 _value,
    uint256 _fee,
    bytes _sig
  )
    public
    onlyNotFrozenAddress(_from)
    onlyNotFrozenAddress(msg.sender)
    whenNotPaused
    returns (bool)
  {
    require(_fee <= balances[_from], 'Not enough amount to be transferred');

    uint256 nonce = _nonce[_from];
    bytes32 message = keccak256(
      'Approve',
      _from,
      _spender,
      _value,
      _fee,
      nonce
    );
    bytes32 hash = ECRecovery.toEthSignedMessageHash(message);

    require(ECRecovery.recover(hash, _sig) == _from, 'Authorization failed');

    allowed[_from][_spender] = _value;
    emit Approval(_from, _spender, _value);

    balances[_from] = balances[_from].sub(_fee);
    balances[msg.sender] = balances[msg.sender].add(_fee);
    emit Transfer(_from, msg.sender, _fee);

    _nonce[_from] = _nonce[_from].add(1);

    return true;
  }

  /**
   * @dev Addition to ERC20 token methods. It allows to
   * @dev approve the transfer of value and execute a call with the sent data.
   *
   * @dev Beware that changing an allowance with this method brings the risk that
   * @dev someone may use both the old and the new allowance by unfortunate
   * @dev transaction ordering. One possible solution to mitigate this race condition
   * @dev is to first reduce the spender's allowance to 0 and set the desired value
   * @dev afterwards:
   * @dev https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * @param _spender The address that will spend the funds.
   * @param _value The amount of tokens to be spent.
   * @param _data ABI-encoded contract call to call `_to` address.
   *
   * @return true if the call function was executed successfully
   */
  function approveAndCall(address _spender, uint256 _value, bytes _data) public returns (bool) {
    require(_spender != address(this));

    approve(_spender, _value);

    // solium-disable-next-line security/no-call-value
    require(_spender.call(_data));

    return true;
  }

  /**
   * @dev Addition to ERC20 token methods. Transfer tokens to a specified
   * @dev address and execute a call with the sent data on the same transaction
   *
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amout of tokens to be transfered
   * @param _data ABI-encoded contract call to call `_to` address.
   *
   * @return true if the call function was executed successfully
   */
  function transferAndCall(address _to, uint256 _value, bytes _data) public returns (bool) {
    require(_to != address(this));

    transfer(_to, _value);

    // solium-disable-next-line security/no-call-value
    require(_to.call(_data));
    return true;
  }

  /**
   * @dev Addition to ERC20 token methods. Transfer tokens from one address to
   * @dev another and make a contract call on the same transaction
   *
   * @param _from The address which you want to send tokens from
   * @param _to The address which you want to transfer to
   * @param _value The amout of tokens to be transferred
   * @param _data ABI-encoded contract call to call `_to` address.
   *
   * @return true if the call function was executed successfully
   */
  function transferFromAndCall(
    address _from,
    address _to,
    uint256 _value,
    bytes _data
  )
    public returns (bool)
  {
    require(_to != address(this));

    transferFrom(_from, _to, _value);

    // solium-disable-next-line security/no-call-value
    require(_to.call(_data));
    return true;
  }

  /**
   * @dev Addition to StandardToken methods. Increase the amount of tokens that
   * @dev an owner allowed to a spender and execute a call with the sent data.
   *
   * @dev approve should be called when allowed[_spender] == 0. To increment
   * @dev allowed value is better to use this function to avoid 2 calls (and wait until
   * @dev the first transaction is mined)
   * @dev From MonolithDAO Token.sol
   *
   * @param _spender The address which will spend the funds.
   * @param _addedValue The amount of tokens to increase the allowance by.
   * @param _data ABI-encoded contract call to call `_spender` address.
   */
  function increaseApprovalAndCall(address _spender, uint _addedValue, bytes _data) public returns (bool) {
    require(_spender != address(this));

    increaseApproval(_spender, _addedValue);

    // solium-disable-next-line security/no-call-value
    require(_spender.call(_data));

    return true;
  }

  /**
   * @dev Addition to StandardToken methods. Decrease the amount of tokens that
   * @dev an owner allowed to a spender and execute a call with the sent data.
   *
   * @dev approve should be called when allowed[_spender] == 0. To decrement
   * @dev allowed value is better to use this function to avoid 2 calls (and wait until
   * @dev the first transaction is mined)
   * @dev From MonolithDAO Token.sol
   *
   * @param _spender The address which will spend the funds.
   * @param _subtractedValue The amount of tokens to decrease the allowance by.
   * @param _data ABI-encoded contract call to call `_spender` address.
   */
  function decreaseApprovalAndCall(address _spender, uint _subtractedValue, bytes _data) public returns (bool) {
    require(_spender != address(this));

    decreaseApproval(_spender, _subtractedValue);

    // solium-disable-next-line security/no-call-value
    require(_spender.call(_data));

    return true;
  }

  function delegateTransferAndCall(
    address _from,
    address _to,
    uint256 _value,
    uint256 _fee,
    bytes _sig,
    bytes _data
  )
    public returns (bool)
  {
    require(_to != address(this));

    delegateTransfer(_from, _to, _value, _fee, _sig);

    // solium-disable-next-line security/no-call-value
    require(_to.call(_data));
    return true;
  }

  function delegateApproveAndCall(
    address _from,
    address _spender,
    uint256 _value,
    uint256 _fee,
    bytes _sig,
    bytes _data
  )
    public returns (bool)
  {
    require(_spender != address(this));

    delegateApprove(_from, _spender, _value, _fee, _sig);

    // solium-disable-next-line security/no-call-value
    require(_spender.call(_data));

    return true;
  }
}
