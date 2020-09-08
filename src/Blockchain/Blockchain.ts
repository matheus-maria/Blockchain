// Requires
import CryptoBlock from './Block'
import BlockService from '../Services/block-service'

export default class CryptoBlockchain {

   Blockchain: CryptoBlock[]
   Difficulty: number

   constructor(difficulty: number) {

      // SET PROPERTIES
      this.getBlockchain();    
      this.Difficulty = difficulty
   }

   getBlockchain = async () => {

      var blockchain = await BlockService.getBlocks()

      if(blockchain.length == 0)
         this.Blockchain = await this.startGenesisBlock()
      else
         this.Blockchain = blockchain
   }

   startGenesisBlock = async (): Promise<CryptoBlock[]> => {
      
      // CREATE GENESIS
      var genesisBlock = new CryptoBlock(0, "Genesis Block", "0")

      // ADD BLOCK TO DATABASE
      BlockService.addBlock(genesisBlock)

      // RESULT
      return [genesisBlock]
   }

   obtainLatestBlock = (): CryptoBlock => {
      return this.Blockchain[this.Blockchain.length - 1]
   }

   addBlock = (data: string): void => {

      // GET LAST BLOCK
      let lastBlock = this.obtainLatestBlock()

      // GENERATE NEW BLOCK
      let newBlock = new CryptoBlock(lastBlock.Index + 1, data, lastBlock.Hash)      
      newBlock.proofOfWork(this.Difficulty)

      // ADD BLOCK TO THE CHAIN
      this.Blockchain.push(newBlock)

      // ADD BLOCK TO DATABASE
      BlockService.addBlock(newBlock)
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