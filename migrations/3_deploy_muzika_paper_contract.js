const MuzikaPaperContract = artifacts.require('MuzikaPaperContract');
const MuzikaCoin = artifacts.require('MuzikaCoin');

module.exports = (deployer) => {
  MuzikaCoin.deployed().then(ins => {
      return deployer.deploy(MuzikaPaperContract, ins.address, Date.now());
  });
};
