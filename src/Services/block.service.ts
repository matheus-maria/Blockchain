import CryptoBlock from '../Blockchain/Block';
import request from 'request'
import mongoose from 'mongoose'
import { isNullOrUndefined } from 'util';
import { config } from '../../package.json'

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

   static getLastBlock = async (): Promise<CryptoBlock> => {

      // GET BLOCKS
      let lastBlock: any = await Blocks.findOne().sort({ field: 'desc', _id: -1 }).limit(1)

      if(isNullOrUndefined(lastBlock)){ return null }
      
      //CONVERT 
      var block = new CryptoBlock(lastBlock.Index, lastBlock.Data, lastBlock.PreviousHash)
      block.Hash = lastBlock.Hash
      block.Nonce = lastBlock.Nonce
      block.Timestamp = lastBlock.Timestamp

      // RESULT
      return block;
   }

   static addBlock = async (block: CryptoBlock): Promise<boolean> => {

      // ADD BLOCK
      await Blocks.create(block);
      return true
   }

   static rebuildBlockchain = async (blockchain: CryptoBlock[]): Promise<boolean> =>{

      // GET BLOCKCHAIN DATA
      request(config.Blockchains[0], async (error, response, body) => {

         // CONVERT DATA
         body = JSON.parse(body)
         let blockArray: CryptoBlock[] = []      
         body.forEach(element => {
            var block = new CryptoBlock(element.Index, element.Data, element.PreviousHash)
            block.Hash = element.Hash
            block.Nonce = element.Nonce
            block.Timestamp = new Date(element.Timestamp)
            blockArray.push(block)
         });

         // REMOVE ALL BLOCKS
         await Blocks.deleteMany({});

         // ADD ALL VALID BLOCKS
         await Blocks.create(blockArray);
      }) 

      return true
   }

}