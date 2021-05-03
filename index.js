const express = require('express')
const router1 = require('./routes/index')
const app = express()
const port = 8000

app.use('/',router1)

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})