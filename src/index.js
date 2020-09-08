'use strict';

// Requires
const CryptoBlockchain = require('./Blockchain/Blockchain')
const CryptoBlock = require('./Blockchain/Block')

let smashingCoin = new CryptoBlockchain();

console.log("smashingCoin mining in progress....");
smashingCoin.addNewBlock(
   new CryptoBlock(1, {
      sender: "Iris Ljesnjanin",
      recipient: "Cosima Mielke",
      quantity: 50
   })
);

smashingCoin.addNewBlock(
   new CryptoBlock(2, {
      sender: "Vitaly Friedman",
      recipient: "Ricardo Gimenes",
      quantity: 100
   })
);

console.log(JSON.stringify(smashingCoin, null, 4));