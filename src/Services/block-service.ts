import CryptoBlock from '../Blockchain/Block';
import mongoose from 'mongoose'

const Blocks = mongoose.model('Blocks');

export default class BlockService {

   static getBlocks = async (): Promise<CryptoBlock[]> => {
      const blocks = await Blocks.find({});
      return blocks
   }

   static addBlock = async (block: CryptoBlock): Promise<boolean> => {

      // ADD BLOCK
      await Blocks.create(block);
      return true
   }

}