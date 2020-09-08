// Requires
import CryptoBlockchain from './Blockchain/Blockchain'
import { config } from '../package.json'

let smashingCoin = new CryptoBlockchain([], config.Difficulty);

console.clear()
console.log("smashingCoin mining in progress....");

smashingCoin.addBlock(
   `{ sender: "Iris Ljesnjanin", recipient: "Cosima Mielke", quantity: 50 }`
);

smashingCoin.addBlock(
   `{ sender: "Vitaly Friedman", recipient: "Ricardo Gimenes", quantity: 100 }`
);

console.log(JSON.stringify(smashingCoin, null, 4));