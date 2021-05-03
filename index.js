const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 8000

app.use('/',router)

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})