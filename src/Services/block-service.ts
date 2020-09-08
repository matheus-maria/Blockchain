import CryptoBlock from '../Blockchain/Block';
import mongoose from 'mongoose'

const Blocks = mongoose.model('Blocks');

export default class BlockService {

   static getBlocks = async (): Promise<CryptoBlock[]> => {
      
      // GET BLOCKS
      const blocks: any = await Blocks.find({});      

      //RESULT
      return blocks as CryptoBlock[]
   }

   static addBlock = async (block: CryptoBlock): Promise<boolean> => {

      // ADD BLOCK
      await Blocks.create(block);
      return true
   }

}