// Requires
import CryptoBlock from './Block'

export default class CryptoBlockchain {

   Blockchain: CryptoBlock[]
   Difficulty: number

   constructor(blockchain: CryptoBlock[], difficulty: number) {

      if(blockchain.length == 0)
         this.Blockchain = [this.startGenesisBlock()];
      else
         this.Blockchain = blockchain

      this.Difficulty = difficulty;
   }

   startGenesisBlock = (): CryptoBlock => {
      return new CryptoBlock(0, "Genesis Block", "0");
   }

   obtainLatestBlock = (): CryptoBlock => {
      return this.Blockchain[this.Blockchain.length - 1];
   }

   addBlock = (data: string): void => {

      // GET LAST BLOCK
      let lastBlock = this.obtainLatestBlock()

      // GENERATE NEW BLOCK
      let newBlock = new CryptoBlock(lastBlock.Index + 1, data, lastBlock.Hash)      
      newBlock.proofOfWork(this.Difficulty);

      // ADD BLOCK TO THE CHAIN
      this.Blockchain.push(newBlock);
   }

   checkChainValidity = (): boolean => {
      for (let i = 1; i < this.Blockchain.length; i++) {

         const currentBlock = this.Blockchain[i];
         const precedingBlock = this.Blockchain[i - 1];

         if (currentBlock.Hash !== currentBlock.computeHash()) {
            return false;
         }
         if (currentBlock.PreviousHash !== precedingBlock.Hash) return false;
      }
      return true;
   }

}