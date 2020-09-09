// Requires
import CryptoBlock from './Block'
import BlockService from '../Services/block.service'
import { isNullOrUndefined } from 'util';

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

   addBlock = (data: string) => {

      // GET LAST BLOCK
      let lastBlock = this.obtainLatestBlock()

      // GENERATE NEW BLOCK
      let newBlock = new CryptoBlock(lastBlock.Index + 1, data, lastBlock.Hash)    
      
      var before = new Date();
      newBlock.proofOfWork(this.Difficulty)
      var after = new Date();
      newBlock.Duration = this.diff_minutes(after, before);

      // ADD BLOCK TO THE CHAIN
      this.Blockchain.push(newBlock)

      // ADD BLOCK TO DATABASE
      BlockService.addBlock(newBlock)
   }

   checkChainValidity = (blockchain: CryptoBlock[]): boolean => {
      for (let i = 1; i < blockchain.length; i++) {

         const currentBlock = blockchain[i];
         const precedingBlock = blockchain[i - 1];

         if (currentBlock.Hash !== currentBlock.computeHash()) return false;
         if (currentBlock.PreviousHash !== precedingBlock.Hash) return false;
      }
      return true;
   }

   monitor = async (time: number): Promise<void> => {

      console.clear()

      var blockchain = await BlockService.getBlocks()

      if(!isNullOrUndefined(blockchain)){
         if(!this.checkChainValidity(blockchain)){
            console.log("Blockchain é inválido")
            console.log("Restaurando o blockchain .....")
            await BlockService.rebuildBlockchain()
            console.log("Blockchain restaurado!")
            await new Promise(r => setTimeout(r, 2000));
         }
         else{
            this.Blockchain = blockchain
            console.log('Blockchain: ' + blockchain.length)
            blockchain.forEach(x => console.log('Hash: ' + x.Hash + ' | Nonce: ' + x.Nonce + ' | Duration (min): ' + x.Duration))
         }
      }

      // LOOP
      setTimeout(() => this.monitor(time) ,time)          
   }

   diff_minutes = (date2, date1): number => {
      var diff =(date2.getTime() - date1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
   
   }
}