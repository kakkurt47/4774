const MuzikaPaperContract = artifacts.require('MuzikaPaperContract');
const MuzikaCoin = artifacts.require('MuzikaCoin');

module.exports = (deployer) => {
  MuzikaCoin.deployed().then(ins => {
      deployer.deploy(MuzikaPaperContract, ins.address, Date.now());
  });
};
