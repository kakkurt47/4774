const HDWalletProvider = require('truffle-hdwallet-provider');
const accessToken = 'WKzAZehMnX4JU4mHjLHY ';
const mnemonic = 'guard rack very inmate draft buddy flame shed picnic genuine oyster view';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
  	development: {
  		host: '127.0.0.1',
  		port: 8545,
  		network_id: '*'
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${accessToken}`)
      },
      network_id: 3,
      gas: 2820423,
      gasPrice: 100000000
    }
    /*
    live: {
      host: 'host',
      port: 80,
      network_id: 1,        // Ethereum public Network
      gas: 50000,
      gasPrice: 681,
      from: '0x123456789',
    }
    */
  }
};
