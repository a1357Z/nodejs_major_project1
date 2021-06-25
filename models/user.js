const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'friendModel'
    }]
},{timestamps : true})

const User = new mongoose.model('User',userSchema)

module.exports = User