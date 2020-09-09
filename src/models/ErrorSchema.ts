import mongoose from 'mongoose'

const ErrorsSchema = new mongoose.Schema({
   Timestamp: {
      type: Date,
      default: Date.now,
      required: true
   },   
   Error: {
      type: String,
      required: true
   }   
});

mongoose.model('Errors', ErrorsSchema);