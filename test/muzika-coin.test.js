const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const MuzikaCoin = artifacts.require('MuzikaCoin');
const toWei = web3.toWei;

contract('MuzikaCoin', ([_, owner, recipient, anotherAccount]) => {
  let muzikaCoin;

  const initialSupply = toWei(1e8);

  beforeEach(async () => {
    muzikaCoin = await MuzikaCoin.new(initialSupply, {from: owner});
  });

  it('should be same with initial supply', async () => {
    const totalSupply = await muzikaCoin.totalSupply();

    totalSupply.should.be.bignumber.equal(initialSupply);
  });

  it('should be burned only for owner', async () => {
    const burnAmount = toWei(1e4);
    await muzikaCoin.transfer(recipient, burnAmount, {from: owner});

    let burn = muzikaCoin.burn(burnAmount, {from: recipient});
    return burn.should.be.rejected;
  })
});
