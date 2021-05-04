// const mongoose = require('mongoose')
const Todo = require('../models/todo-item')
require('../config/database')
const add =  async (req,res) =>{
    console.log(req.body);
    try{
        const todo = await Todo.create(req.body)
        console.log('created',todo);
    }catch(e){
        console.log(e);
    }
    res.redirect('/')
}

module.exports = add;