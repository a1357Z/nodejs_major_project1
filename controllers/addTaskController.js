//getting the model and the database file running
const Todo = require('../models/todo-item')
require('../config/database')

//executing the add task functionality
const addTask =  async (req,res) =>{

    try{
        const todo = await Todo.create(req.body)
        console.log('created',todo);
    }catch(e){
        console.log(e);
    }
    res.redirect('/')
}

module.exports = addTask;