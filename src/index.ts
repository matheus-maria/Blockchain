// Requires
import mongoose from 'mongoose'
import { config } from '../package.json'
import requireDir from 'require-dir'
requireDir('models');
import CryptoBlockchain from './Blockchain/Blockchain'

// Connect to Blockchain database
mongoose.connect(config.ConnString, { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true } )

// Load Blockchain
let helixBlockchain = new CryptoBlockchain(config.Difficulty)

// Monitor blockchain
helixBlockchain.monitor(config.MonitoringTime)

setTimeout(() =>{

   helixBlockchain.addBlock(
      `{ "AAA": 50  }`
   );

},5000)

