const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const ResetPasswordToken = require('../models/resetPasswordToken')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
},
function(req,email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { 
          req.flash('error',err)
          return done(err);
         }
      if(!user || user.password != password){
          req.flash('error','invalid username/password')
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

passport.setAuthenticatedUser = async function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
        try{
            let resetPasswordToken = await ResetPasswordToken.findOne({user: req.user._id})
            res.locals.resetPasswordToken = resetPasswordToken.token
        }catch(e){
            console.log('could not find token');
        }
        
    }
    next()
}

module.exports = passport