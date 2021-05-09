const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
},
function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if(!user || user.password != password){
          console.log('invalid username');
          return done(null,false)
      }
      return done(null,user)
    });
  }
))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//deserialize the user
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log('error in finding user',err);
            return done(err)
        }
        return done(null,user)
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        //console.log(req.url);
        return next()
    }
    //if req is not authenticated
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport