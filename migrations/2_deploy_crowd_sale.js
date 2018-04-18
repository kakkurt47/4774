const MuzikaCoin = artifacts.require("MuzikaCoin");
const MuzikaPaperContract = artifacts.require('MuzikaPaperContract');

module.exports = (deployer, network, accounts) => {
  deployer.deploy(MuzikaCoin, 1e+27).then(() => {
      return deployer.deploy(MuzikaPaperContract, MuzikaCoin.address, Date.now());
  });
};
