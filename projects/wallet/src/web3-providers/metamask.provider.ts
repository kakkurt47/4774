declare const window;

export const MetamaskProvider = () => {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (window !== undefined && typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    return window.web3.currentProvider;
  } else {
    throw new Error('No web3? You should consider trying MetaMask!');
  }
};
