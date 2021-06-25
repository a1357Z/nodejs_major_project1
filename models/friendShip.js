const mongoose = require('mongoose')
const friendShipSchema = new mongoose.Schema({
  from:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  to:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{timestamps : true})

const friendModel = mongoose.model('friendModel',friendShipSchema)
module.exports =  friendModel