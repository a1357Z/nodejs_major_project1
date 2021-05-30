const mongoose = require('mongoose')

const profilePicSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  fileName : {
    type : String,
    required : true
  }
})

const ProfilePic = mongoose.model('ProfilePic',profilePicSchema)

module.exports = ProfilePic