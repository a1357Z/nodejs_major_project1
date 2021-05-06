const express = require('express')
const router = require('./routes/index')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser= require('cookie-parser')
const app = express()
const port = 8000

app.use(expressLayouts)
app.use(cookieParser())
app.use(express.urlencoded())
//extract the style and scripts from the subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use('/',router)
app.use(express.static('assets'))
app.set('view engine','ejs')
app.set('views','./views')

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})