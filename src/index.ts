// IMPORTS
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import requireDir from 'require-dir'

// REFERECES
import keys from './keys'
requireDir('models');
import CryptoBlockchain from './Blockchain/Blockchain'
import HelixService from './Services/helix.service';

// Constants
const PORT = 8080

// App
const app = express()
app.use(express.json());
app.use(cors());

// Connect to Blockchain database
mongoose.Promise = global.Promise
mongoose.connect(keys.ConnString, { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true })

// Load Blockchain
let helixBlockchain = new CryptoBlockchain(parseInt(keys.Difficulty))

// Monitor blockchain
helixBlockchain.monitor(parseInt(keys.MonitoringTime))

// Monitor Helix
var helix = new HelixService(keys.HelixUrl, helixBlockchain);
setTimeout(() => helix.monitorEntity(keys.HelixEntity, parseInt(keys.MonitoringTime)) ,2000) 

// Route
app.use('/api', require('./routes'));

app.listen(PORT, () => {})