// Requires
import SHA256 from "crypto-js/sha256"

export default class CryptoBlock{

   // VARIABLES
   Index: number
   Timestamp: Date
   Data: any
   Hash: string
   PreviousHash: string
   Nonce: number

   constructor(index: number, data: any, precedingHash: string = " ") {
      this.Index = index
      this.Timestamp = new Date()
      this.Data = data
      this.Hash = this.computeHash()
      this.PreviousHash = precedingHash
      this.Nonce = 0
   }
   

   computeHash = (): string => {
      return SHA256(
         this.Index +
         this.PreviousHash +
         this.Timestamp +
         JSON.stringify(this.Data) +
         this.Nonce
      ).toString();
   }

   proofOfWork = (difficulty: number): void => {
      while (
         this.Hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
      ) {
         this.Nonce++;
         this.Hash = this.computeHash();
      }
   }

}