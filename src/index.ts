// Requires
import mongoose from 'mongoose'
import { config } from '../package.json'
import requireDir from 'require-dir'
requireDir('models');
import CryptoBlockchain from './Blockchain/Blockchain'

// Connect to Blockchain database
mongoose.connect(config.ConnString, { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true } )

// Load Blockchain
let smashingCoin = new CryptoBlockchain(config.Difficulty)

setTimeout(() => {

   console.clear()

   smashingCoin.addBlock(
      `{ "AAA": 50  }`
   );
   
   console.log(JSON.stringify(smashingCoin, null, 4))

},3000)

