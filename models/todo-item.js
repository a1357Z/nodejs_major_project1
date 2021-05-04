const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    category:{
        type : String,
        required : true
    },
    dueDate:{
        type : Date
    }
})

const todo = mongoose.model('todo',todoSchema)

module.exports = todo