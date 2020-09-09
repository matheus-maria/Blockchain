import mongoose from 'mongoose'
import CryptoBlock from '../Blockchain/Block';
const Blocks = mongoose.model('Blocks');

export default class BlockchainController {

   static getBlocks = async (req, res) => {
      
      // GET BLOCKS
      let blocks: any = await Blocks.find({});
      let blockArray: CryptoBlock[] = []
      
      blocks.forEach(element => {
         
         var block = new CryptoBlock(element.Index, element.Data, element.PreviousHash)
         block.Hash = element.Hash
         block.Nonce = element.Nonce
         block.Timestamp = element.Timestamp
         block.Duration = element.Duration
         blockArray.push(block)
      });

      //RESULT
      return res.json(blockArray);
   } 

}