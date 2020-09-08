'use strict';

// Requires
const CryptoBlock = require('./Block')

class CryptoBlockchain {

   constructor() {
      this.blockchain = [this.startGenesisBlock()];
      this.difficulty = 4;
   }

   startGenesisBlock() {
      return new CryptoBlock(0, "Genesis Block", "0");
   }

   obtainLatestBlock() {
      return this.blockchain[this.blockchain.length - 1];
   }

   addNewBlock(newBlock) {
      let lastBlock = this.obtainLatestBlock()
      newBlock.index = lastBlock.index + 1;
      newBlock.precedingHash = lastBlock.hash;
      newBlock.proofOfWork(this.difficulty);
      this.blockchain.push(newBlock);
   }

   checkChainValidity() {
      for (let i = 1; i < this.blockchain.length; i++) {

         const currentBlock = this.blockchain[i];
         const precedingBlock = this.blockchain[i - 1];

         if (currentBlock.hash !== currentBlock.computeHash()) {
            return false;
         }
         if (currentBlock.precedingHash !== precedingBlock.hash) return false;
      }
      return true;
   }

}

module.exports = CryptoBlockchain