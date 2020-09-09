import mongoose from 'mongoose'

const BlocksSchema = new mongoose.Schema({
   Index: {
      type: Number,
      required: true
   },
   Timestamp: {
      type: Date,
      default: Date.now,
      required: true
   },
   Data: {
      type: Object,
      required: true
   },
   Hash: {
      type: String,
      required: true
   },
   PreviousHash: {
      type: String,
      required: true
   },
   Nonce: {
      type: Number,
      required: true
   },
   Duration: {
      type: Number,
      required: true
   }
});

mongoose.model('Blocks', BlocksSchema);