const MuzikaCoin = artifacts.require("MuzikaCoin");

module.exports = (deployer) => {
	const decimals = 18;
	const initialSupply = 1e9;

	deployer.deploy(MuzikaCoin, initialSupply * (10 ** decimals));
};
