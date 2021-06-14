const mongoose = require('mongoose')

const resetPasswordSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  token:{
    type: String,
    required: true
  }
},{timestamps: true})

module.exports = new mongoose.model('resetPasswordToken',resetPasswordSchema)