const GustavoCoinCrowdsale = artifacts.require("./MusikaCoinCrowdsale.sol")
const Web3 = require('web3');
const web3 = new Web3();

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
  const endTime = startTime + (86400 * 50) // 50 days
  const rate = new web3.BigNumber(1000)
  const wallet = '0xd7cBA9f7b57A865e99A384Da6c16343ae01f6644'

  deployer.deploy(MusikaCoinCrowdsale, startTime, endTime, rate, wallet)
};
