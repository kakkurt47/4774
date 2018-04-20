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
> eth = web3.eth

# accounts[1] sells a paper
# This paper is indexed 1
> paper.sell.sendTransaction('My First Paper', 50000, '0ab0fa02fb4a968b1a9fba0fba5f1b1f8' {from: eth.accounts[1]})

# Set amount of allowance from account[0] to contract
# txParameter 'from' is automatically set to account[0]
# > token.approve.sendTransaction(paper.address, 1000000, {from: eth.accounts[0]})
> token.approve.sendTransaction(paper.address, 1000000)

# See allowance
> token.allowance.call(eth.accounts[0], paper.address)

# accounts[0] already bought paper 1?
> paper.isPurchased.call(eth.accounts[0], 1)

# purhcase paper 1
> paper.purchase.sendTransaction(1, {from: eth.accounts[0]});

# check if purchased
> paper.isPurchased.call(eth.accounts[0], 1)

# Check balances
> token.balanceOf(eth.accounts[0])
> token.balanceOf(eth.accounts[1])
```
