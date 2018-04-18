1. web3, truffle global install
```
npm install -g web3 truffle
```

2. Deploy and test (local)
```bash
truffle migrate
```
  * Use `truffle console` to execute function of contract or send transactions to contract.

### Purchase Test

1. Start [Ganache](http://truffleframework.com/ganache/) client
2. Open console with `truffle console`
3. Follow script to test for sending transactions

```
# Create instances of contracts
> token = MuzikaCoin.at(MuzikaCoin.address)
> paper = MuzikaPaperContract.at(MuzikaPaperContract.address)

# accounts[1] sells a paper
# This paper is indexed 1
> paper.sale.sendTransaction('My First Paper', 50000, {from: accounts[1]})

# Set amount of allowance from account[0] to contract
# txParameter 'from' is automatically set to account[0]
> token.approve.transaction(eth.accounts[0], paper.address)

# See allowance
> token.allowance.call(eth.accounts[0], paper.address)

# accounts[0] alreadt bought paper 1?
> paper.isPurchased.call(eth.accounts[0], 1)

# purhcase paper 1
> paper.purchase.sendTransaction(1, {from: eth.accounts[0]});

# check if purchased
> paper.isPurchased.call(eth.accounts[0], 1)
```