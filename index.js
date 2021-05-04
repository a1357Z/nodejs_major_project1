const express = require('express')
const router1 = require('./routes/index')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use('/',router1)

// app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs')
app.use('/static', express.static('static'))

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})