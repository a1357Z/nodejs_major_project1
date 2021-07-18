const express = require('express')
const router = require('./routes/index')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser= require('cookie-parser')
var sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const customMware = require('./config/middleware')
//used for session cookie
const session = require('express-session')
// const passportLocal = require('./config/passport-local-strategy')
const passport = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauthStrategy')
const app = express()
require('./config/view-helpers')(app)
const port = 8000
const env = require('./config/environment')
const logger = require('morgan')
require('dotenv').config()
const path = require('path')

if(env.name === 'development'){
    app.use(sassMiddleware({
        /* Options */
        src:path.join(__dirname,env.asset_path,'/scss'),
        dest: path.join(__dirname,env.asset_path,'/css'),
        debug: true,
        outputStyle: 'extended',
        prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    }));
}

app.use(express.json())
app.use(expressLayouts)
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

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
    secret : process.env.SESSION_SECRET,
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
//setting up flash after session
app.use(flash())
app.use(customMware.setFlash)
app.use(passport.setAuthenticatedUser)

//use passport jwt
app.use(passportJWT.initialize())
//use passport google
app.use(passportGoogle.initialize())
//use express router
app.use('/',router)
app.use(express.static(env.asset_path))

//use logger
app.use(logger(env.morgan.mode,env.morgan.options))

console.log('the env is ',env);

//setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app)
const chatSockets = require('./config/chat_socket').chatSockets(chatServer)
chatServer.listen(5000)
console.log('chatServer is listening on port 5000');

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})