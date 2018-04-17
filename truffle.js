module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
  	development: {
  		host: '127.0.0.1',
  		port: '7545',
  		network_id: '*'
    },
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
