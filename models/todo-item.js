const mongoose = require('mongoose')

//creating the todo item schema
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