import assertRevert from './helpers/assertRevert';

const BigNumber = web3.BigNumber;
const MuzikaCoin = artifacts.require('MuzikaCoin');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('MuzikaCoin', ([_, owner, recipient, anotherAccount]) => {
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
});
