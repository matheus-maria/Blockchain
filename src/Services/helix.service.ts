import request from 'request'
import BlockService from './block.service'
import CryptoBlockchain from '../Blockchain/Blockchain'
import { isNullOrUndefined } from 'util'

export default class HelixService {

   HelixUrl: string
   Blockchain: CryptoBlockchain

   constructor(helixUrl: string, blockchain: CryptoBlockchain){
      this.HelixUrl = helixUrl
      this.Blockchain = blockchain
   }

   monitorEntity = async (entity: string, time: number): Promise<void> => {

      // GET HELIX CURRENT VALUE
      request(this.HelixUrl + entity, async (error, response, body) => {

         let currentObject = JSON.parse(body.split(',"metadata":{}').join(""))

         // GET LAST WHITEN BLOCK 
         var lastBlock = await BlockService.getLastBlock();

         if(isNullOrUndefined(lastBlock)){ return }
         else if (lastBlock.Data == "Genesis Block"){ this.Blockchain.addBlock(currentObject.transaction.value); }
         else if(JSON.stringify(lastBlock.Data) != JSON.stringify(currentObject.transaction.value)){
            this.Blockchain.addBlock(currentObject.transaction.value);
         }
      })

      // LOOP
      setTimeout(() => this.monitorEntity(entity,time) ,time) 
   }
}