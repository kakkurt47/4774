const MuzikaCoin = artifacts.require("MuzikaCoin")

module.exports = (deployer, network, accounts) => {
  deployer.deploy(MuzikaCoin);
};
