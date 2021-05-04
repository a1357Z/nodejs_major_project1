require('../config/database')
const Todo = require('../models/todo-item')

let categories=['home','work', 'school', 'voluntary']

var home= async (req,res)=>{
    try{
        let data = await Todo.find({})
        //console.log(data);
        let items = data.map(item=>{
            let date = new Date(item.dueDate)
            //could not implement the following command
            //item.dueDate = date.toLocaleDateString()
            let obj={}
            obj._id = item._id
            obj.taskName = item.taskName
            obj.category = item.category
            obj.dueDate = date.toLocaleDateString()
             //console.log( obj.dueDate);
             return obj
        })
        return res.render('todoList',{categories,tasksList : items})
    }catch(e){
        console.log(e);
        return res.send('<h1>Could not load your tasks from the database</h1>')
    }
    
}

module.exports = home