const MuzikaCoinSavingsWallet = artifacts.require("MuzikaCoinSavingsWallet");

module.exports = (deployer) => {
	// Heartbeat Timeout: 7 days
	const heartbeatTimeout = 7 * 24 * 3600;

	deployer.deploy(MuzikaCoinSavingsWallet, heartbeatTimeout);
};
