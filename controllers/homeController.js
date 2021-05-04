
 //getting the model and the database file running
require('../config/database')
const Todo = require('../models/todo-item')

//the various categories for a todo item
let categories=['home','work', 'school', 'voluntary']

var homeController= async (req,res)=>{
    try{
        let data = await Todo.find({})
        
        //creating an items array with the modified due dates or with no due date
        let items = data.map(item=>{
            let obj={}
            obj._id = item._id
            obj.taskName = item.taskName
            obj.category = item.category

            if(item.dueDate){
                let date = new Date(item.dueDate)
                obj.dueDate = date.toLocaleDateString()
            }else{
                obj.dueDate = 'no deadline'
            }
            
             return obj
        })
        return res.render('todoList',{categories,tasksList : items})
    }catch(e){
        console.log(e);
        return res.send('<h1>Could not load your tasks from the database</h1>')
    }
    
}

module.exports = homeController