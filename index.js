const express = require('express')
const router = require('./routes/index')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser= require('cookie-parser')
var sassMiddleware = require('node-sass-middleware')

//used for session cookie
const session = require('express-session')
// const passportLocal = require('./config/passport-local-strategy')
const passport = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')

const app = express()
const port = 8000

app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(expressLayouts)
app.use(cookieParser())
app.use(express.urlencoded())

//extract the style and scripts from the subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)



//set up the view engine    
app.set('view engine','ejs')
app.set('views','./views')

//mongo store is used to store the session cookie in the database
app.use(session({
    name : 'codeial',
    //todo change the secret before deployment 
    secret : 'hihaha',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 1000*60*100
    },
    store : MongoStore.create(
        {
        mongoUrl : 'mongodb://localhost/codeial_development',
        //mongooseConnection : db,
        autoRemove : 'disabled'
        },
        function(err){
            console.log(err||'connected to db using mongostore');
        }
    )
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

//use express router
app.use('/',router)
app.use(express.static('assets'))

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})