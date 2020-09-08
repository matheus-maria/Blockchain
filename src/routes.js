import express from 'express'
var routes = express.Router();

import BlockchainController from './Controllers/blockchain.controller';

routes.get('/getBlocks', BlockchainController.getBlocks)

module.exports = routes