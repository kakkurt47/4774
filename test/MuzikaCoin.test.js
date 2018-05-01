import assertRevert from './helpers/assertRevert';
import promisify from './helpers/promisify';
import toHex from './helpers/toHex';

const BigNumber = web3.BigNumber;
const MuzikaCoin = artifacts.require('MuzikaCoin');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('MuzikaCoin', ([_, owner, recipient, anotherAccount, thirdAccount]) => {
  const initialSupply = 10000;
  let token;

  beforeEach(async () => {
    token = await MuzikaCoin.new(initialSupply, {from: owner});
  });

  it('should be same with initial supply', async () => {
    const totalSupply = await token.totalSupply();

    totalSupply.should.be.bignumber.equal(initialSupply);
  });

  it('should be burned only for owner', async () => {
    const burnAmount = 500;
    await token.transfer(recipient, burnAmount, {from: owner});

    await assertRevert(token.burn(burnAmount, {from: recipient}));
  });

  it('should be transferred', async () => {
    const transferAmount = 500;
    await token.transfer(recipient, transferAmount, {from: owner});

    const balance = await token.balanceOf(recipient);
    balance.should.be.bignumber.equal(transferAmount);
  });

  it('should not be transferred when paused', async () => {
    const paused = await token.paused();

    paused.should.be.equal(false, 'It must be not paused');

    await token.pause({from: owner});

    await assertRevert(token.transfer(recipient, 100, {from: owner}));
    await assertRevert(token.transfer(owner, 10, {from: recipient}));
  });

  it('should be able to freeze account', async () => {
    let isFrozen = await token.frozenAddress(recipient);
    isFrozen.should.be.equal(false, 'Recipient should be unfrozen');

    await token.freezeAddress(recipient, {from: owner});

    isFrozen = await token.frozenAddress(recipient);
    isFrozen.should.be.equal(true, 'Recipient should be frozen');

    await token.unfreezeAddress(recipient, {from: owner});

    isFrozen = await token.frozenAddress(recipient);
    isFrozen.should.be.equal(false, 'Recipient should be unfrozen');
  });

  it('disallows frozen address to transfer', async () => {
    await token.transfer(recipient, 100, {from: owner});
    await token.freezeAddress(recipient, {from: owner});

    await assertRevert(token.transfer(owner, 50, {from: recipient}));

    const balance = await token.balanceOf(recipient);
    balance.should.be.bignumber.equal(100);
  });

  it('allows to transfer from address to another address', async () => {
    const amount = 100;

    await token.transfer(recipient, amount, {from: owner});
    await token.approve(thirdAccount, 5000, {from: recipient});

    await token.transferFrom(recipient, anotherAccount, amount, {from: thirdAccount});

    const balance = await token.balanceOf(anotherAccount);

    balance.should.be.bignumber.equal(amount);
  });

  it('disallows to transfer from blocked address to another address', async () => {
    await token.transfer(recipient, 100, {from: owner});
    await token.approve(thirdAccount, 5000, {from: recipient});

    await token.freezeAddress(recipient, {from: owner});

    await assertRevert(token.transferFrom(recipient, anotherAccount, 50, {from: thirdAccount}));
  });

  it('disallows blocked and approved account to transfer from address to another address', async () => {
    await token.transfer(recipient, 100, {from: owner});
    await token.approve(thirdAccount, 5000, {from: recipient});

    await token.freezeAddress(thirdAccount, {from: owner});

    await assertRevert(token.transferFrom(recipient, anotherAccount, 50, {from: thirdAccount}));
  });

  describe('delegateTransfer() tests', () => {
    let from;
    const to = recipient;
    const delegate = anotherAccount;
    const initialTransferAmount = 5000;
    const amount = 500;
    const fee = 10;
    let nonce;

    const sign = async (_from, _to, _amount, _fee, _nonce) => {
      let message = ''.concat(
        web3.toHex('Transfer'),
        _from.slice(2),
        _to.slice(2),
        toHex(_amount, 64),
        toHex(_fee, 64),
        toHex(_nonce, 64)
      );
      message = web3.sha3(message, {encoding: 'hex'});
      return await promisify(web3.eth.sign, _from, message);
    };

    beforeEach(async () => {
      // new account has no ether
      from = web3.personal.newAccount('password');
      await web3.personal.unlockAccount(from, 'password');

      await token.transfer(from, initialTransferAmount, {from: owner});

      nonce = await token.getNonce(from);
    });

    it('should support to delegate transferring correctly', async () => {
      // 'from' wants to transfer to 'to' without use ether
      const currentEther = await promisify(web3.eth.getBalance, from);
      const signature = await sign(from, to, amount, fee, nonce);

      // another account send the transaction
      await token.delegateTransfer(from, to, amount, fee, signature, {from: delegate});

      const balanceOfFrom = await token.balanceOf(from);
      const balanceOfTo = await token.balanceOf(to);
      const balanceOfDelegate = await token.balanceOf(delegate);
      const etherOfFrom = await promisify(web3.eth.getBalance, from);
      const changedNonce = await token.getNonce(from);

      balanceOfFrom.should.be.bignumber.equal(initialTransferAmount - amount - fee);
      balanceOfTo.should.be.bignumber.equal(amount);
      balanceOfDelegate.should.be.bignumber.equal(fee);
      etherOfFrom.should.be.bignumber.equal(currentEther);
      changedNonce.should.be.bignumber.equal(nonce + 1);
    });

    it('is successfully transferred with boundary value', async () => {
      // exceeded amount
      const signature = await sign(from, to, initialTransferAmount - fee, fee, nonce);

      // abnormal amount
      await token.delegateTransfer(from, to, initialTransferAmount - fee, fee, signature, {from: delegate});

      const balanceOfFrom = await token.balanceOf(from);
      const balanceOfTo = await token.balanceOf(to);
      const balanceOfDelegate = await token.balanceOf(delegate);

      balanceOfFrom.should.be.bignumber.equal(0);
      balanceOfTo.should.be.bignumber.equal(initialTransferAmount - fee);
      balanceOfDelegate.should.be.bignumber.equal(fee);
    });

    it('should not be transferred when it has invalid nonce', async () => {
      const abnormalNonce = nonce + 2;
      const signature = await sign(from, to, amount, fee, abnormalNonce);

      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });

    it('should protect to replay', async () => {
      const signature = await sign(from, to, amount, fee, nonce);

      await token.delegateTransfer(from, to, amount, fee, signature, {from: delegate});
      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when it has invalid parameter', async () => {
      const signature = await sign(from, to, amount, fee, nonce);

      // abnormal amount
      await assertRevert(token.delegateTransfer(from, to, 600, fee, signature, {from: delegate}));
      await assertRevert(token.delegateTransfer(from, to, amount, 50, signature, {from: delegate}));
      await assertRevert(token.delegateTransfer(from, owner, amount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when it has invalid signature', async () => {
      const signature = await sign(delegate, to, amount, fee, nonce);

      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when it has balances of \'from\' is over', async () => {
      // exceeded amount
      const signature = await sign(from, to, initialTransferAmount, fee, nonce);

      // abnormal amount
      await assertRevert(token.delegateTransfer(from, to, initialTransferAmount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when overflow', async () => {
      let amount = web3.toBigNumber('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
      let fee = web3.toBigNumber('0x8000000000000000000000000000000000000000000000000000000000000001');
      // amount + fee = 0x7f...fff + 0x800...001 = 0x000...000 in uint256
      const signature = await sign(from, to, amount, fee, nonce);

      // abnormal amount
      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });
  });

  describe('delegateApprove() tests', () => {
    let from;
    const to = recipient;
    const delegate = anotherAccount;
    const initialTransferAmount = 1000;
    const amount = 500;
    const fee = 10;
    let nonce;

    const sign = async (_from, _to, _amount, _fee, _nonce) => {
      let message = ''.concat(
        web3.toHex('Transfer'),
        _from.slice(2),
        _to.slice(2),
        toHex(_amount, 64),
        toHex(_fee, 64),
        toHex(_nonce, 64)
      );
      message = web3.sha3(message, {encoding: 'hex'});
      return await promisify(web3.eth.sign, _from, message);
    };

    beforeEach(async () => {
      // new account has no ether
      from = web3.personal.newAccount('password');
      await web3.personal.unlockAccount(from, 'password');

      await token.transfer(from, initialTransferAmount, {from: owner});

      nonce = await token.getNonce(from);
    });

    it('should support to delegate transferring correctly', async () => {
      // 'from' wants to transfer to 'to' without use ether
      const currentEther = await promisify(web3.eth.getBalance, from);
      const signature = await sign(from, to, amount, fee, nonce);

      // another account send the transaction
      await token.delegateTransfer(from, to, amount, fee, signature, {from: delegate});

      const balanceOfFrom = await token.balanceOf(from);
      const balanceOfTo = await token.balanceOf(to);
      const balanceOfDelegate = await token.balanceOf(delegate);
      const etherOfFrom = await promisify(web3.eth.getBalance, from);
      const changedNonce = await token.getNonce(from);

      balanceOfFrom.should.be.bignumber.equal(initialTransferAmount - amount - fee);
      balanceOfTo.should.be.bignumber.equal(amount);
      balanceOfDelegate.should.be.bignumber.equal(fee);
      etherOfFrom.should.be.bignumber.equal(currentEther);
      changedNonce.should.be.bignumber.equal(nonce + 1);
    });

    it('is successfully transferred with boundary value', async () => {
      // exceeded amount
      const signature = await sign(from, to, initialTransferAmount - fee, fee, nonce);

      // abnormal amount
      await token.delegateTransfer(from, to, initialTransferAmount - fee, fee, signature, {from: delegate});

      const balanceOfFrom = await token.balanceOf(from);
      const balanceOfTo = await token.balanceOf(to);
      const balanceOfDelegate = await token.balanceOf(delegate);

      balanceOfFrom.should.be.bignumber.equal(0);
      balanceOfTo.should.be.bignumber.equal(initialTransferAmount - fee);
      balanceOfDelegate.should.be.bignumber.equal(fee);
    });

    it('should not be transferred when it has invalid nonce', async () => {
      const abnormalNonce = nonce + 2;
      const signature = await sign(from, to, amount, fee, abnormalNonce);

      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when it has invalid parameter', async () => {
      const signature = await sign(from, to, amount, fee, nonce);

      // abnormal amount
      await assertRevert(token.delegateTransfer(from, to, 600, fee, signature, {from: delegate}));
      await assertRevert(token.delegateTransfer(from, to, amount, 50, signature, {from: delegate}));
      await assertRevert(token.delegateTransfer(from, owner, amount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when it has invalid signature', async () => {
      const signature = await sign(delegate, to, amount, fee, nonce);

      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when it has balances of \'from\' is over', async () => {
      // exceeded amount
      const signature = await sign(from, to, initialTransferAmount, fee, nonce);

      // abnormal amount
      await assertRevert(token.delegateTransfer(from, to, initialTransferAmount, fee, signature, {from: delegate}));
    });

    it('should not be transferred when overflow', async () => {
      let amount = web3.toBigNumber('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
      let fee = web3.toBigNumber('0x8000000000000000000000000000000000000000000000000000000000000001');
      // amount + fee = 0x7f...fff + 0x800...001 = 0x000...000 in uint256
      const signature = await sign(from, to, amount, fee, nonce);

      // abnormal amount
      await assertRevert(token.delegateTransfer(from, to, amount, fee, signature, {from: delegate}));
    });
  });
});
