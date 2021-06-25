const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  ON:{
    type:mongoose.Schema.Types.ObjectId, 
    refPath: 'onModel',
    required: true
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Comment', 'Post']
  }
},{timestamps: true})

const Like = new mongoose.model('Like',likeSchema)
module.exports = Like