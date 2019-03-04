const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const jwtSecret = "life is good";

/* ------- */
/* Classes */
/* ------- */
class Transaction{
  constructor(fromAddress, toAddress, amount){
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
  }
}

class Account{
    constructor(hash){
        this.hash = hash;
    }
}

class Deal{
    constructor(dealCreator, hash){
        this.dealCreator = dealCreator;
        this.hash = hash;
    }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = this.calculateHash();
      this.nonce = 0;
  }

  calculateHash() {
      return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
      while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
          this.nonce++;
          this.hash = this.calculateHash();
      }

      console.log("BLOCK MINED: " + this.hash);
  }
}

class Blockchain {
  constructor(genesisNode) {
      this.chain = [this.createGenesisBlock()];
      this.nodes = [+genesisNode]
      this.difficulty = 4;
      this.pendingTransactions = [];
      this.miningReward = 100;
  }

  registerNode(port) {
      if (!this.nodes.includes(port)) {
          this.nodes.push(port);
      }
  }

  retrieveNodes() {
      return this.nodes;
  }

  updateBlockchain(newChain) {
      this.chain = newChain;
  }

  createGenesisBlock() {
      return new Block(Date.parse("2019-01-01"), [], "0");
  }

  getLatestBlock() {
      return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress){
      let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
      block.mineBlock(this.difficulty);

      console.log('Block successfully mined!');
      this.chain.push(block);

      this.pendingTransactions = [
          new Transaction(null, miningRewardAddress, this.miningReward)
      ];
  }

  createTransaction(transaction){
      this.pendingTransactions.push(transaction);
  }

  createAccount(login, password){
      const hash =  SHA256(login + password).toString();
      for(const block of this.chain){
          for(const trans of block.transactions){
              if(trans.hash === hash ){
                  return "User already exist"
              }
          }
      }
      this.pendingTransactions.push(new Account(hash))
      return "User have been registrate. Transaction added to pending transactions."
  }

  getAuthorized(login, password){
      const currentHash = SHA256(login + password).toString();
      for(const block of this.chain){
          for(const trans of block.transactions){
              if(trans.hash === currentHash ){
                  const token = jwt.sign(currentHash.toString(),jwtSecret);
                  return token
              }
          }
      }
      return "Пользователь не существует"
  }

  createDeal(fromAddress, hash){
      this.pendingTransactions.push(new Deal(fromAddress,hash))
  }

  getBalanceOfAddress(address){
      let balance = 0;

      for(const block of this.chain){
          for(const trans of block.transactions){
              if(trans.fromAddress === address){
                  balance -= trans.amount;
              }

              if(trans.toAddress === address){
                  balance += trans.amount;
              }
          }
      }
      return balance;
  }

  checkDeal(creator, hash){
      for(const block of this.chain){
          for(const trans of block.transactions){
              if(trans.hash === hash && trans.dealCreator === creator ){
                  return "Документ существует! Хеш совпадает!"
              }
          }
      }
      return "Данный документ не зарегестрирован в системе."
  }

  isChainValid() {
      for (let i = 1; i < this.chain.length; i++){
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];

          if (currentBlock.hash !== currentBlock.calculateHash()) {
              return false;
          }
          if (currentBlock.previousHash !== previousBlock.hash) {
              return false;
          }
      }
      return true;
  }
}

export {
  Block, Transaction, Blockchain, Account
}