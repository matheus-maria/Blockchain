import CryptoBlock from '../Blockchain/Block';
import mongoose from 'mongoose'

const Blocks = mongoose.model('Blocks');

export default class BlockService {

   static getBlocks = async (): Promise<CryptoBlock[]> => {
      
      // GET BLOCKS
      let blocks: any = await Blocks.find({});
      let blockArray: CryptoBlock[] = []
      
      blocks.forEach(element => {
         
         var block = new CryptoBlock(element.Index, element.Data, element.PreviousHash)
         block.Hash = element.Hash
         block.Nonce = element.Nonce
         block.Timestamp = element.Timestamp
         blockArray.push(block)
      });


      //RESULT
      return blockArray
   }

   static addBlock = async (block: CryptoBlock): Promise<boolean> => {

      // ADD BLOCK
      await Blocks.create(block);
      return true
   }

   static rebuildBlockchain = async (blockchain: CryptoBlock[]): Promise<boolean> =>{

      // REMOVE ALL BLOCKS
      await Blocks.deleteMany({});

      // ADD ALL VALID BLOCKS
      await Blocks.create(blockchain);

      return true

   }

}