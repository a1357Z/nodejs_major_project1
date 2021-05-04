 //getting the model and the database file running

 const Todo = require('../models/todo-item')
 require('../config/database')

 
 let deletetask = async (req,res) =>{
    console.log(req.body)

    try{

        if(typeof(req.body._id)==="object"){
            let array = [ ...req.body._id]
            array.forEach(async (element) => {
                await Todo.findOneAndDelete({_id : element})
            });
        }else{
            await Todo.findOneAndDelete({_id : req.body._id})
        }
        
        
    }catch(e){
        console.log(e);
    }
    res.redirect('/')
 }

 module.exports = deletetask