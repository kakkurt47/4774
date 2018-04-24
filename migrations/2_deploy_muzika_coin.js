const MuzikaCoin = artifacts.require("MuzikaCoin");

module.exports = (deployer) => {
	const decimals = 18;
	const initialSupply = 1e8;

	deployer.deploy(MuzikaCoin, initialSupply * (10 ** decimals));
};
