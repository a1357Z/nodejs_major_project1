const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const passport = require('passport')
const crypto = require('crypto')
const User = require('../models/user')

passport.use(new googleStrategy({
  clientID: "922022792417-nh138ivctp9mgkqjkn83j88k4qid8sht.apps.googleusercontent.com",
  clientSecret: "J-QEvmDtzBANpOcsUfLWE1xa",
  callbackURL: "http://localhost:8000/users/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  User.findOne({email: profile.emails[0].value},(err,user)=>{
    if(err){
      console.log('error in google strategy passport');
      return done(err,null)
    }
    if(user){
      return done(null,user)
    }else{
      User.create({
        name : profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex')
      },
      (err,user)=>{
        if(err){
          console.log('error in creating user');
          return
        }
        return done(null,user)
      })
    }
  })
  console.log('profile',profile);
  console.log('accessToken',accessToken);
  console.log('refreshToken',refreshToken);
}
));

module.exports = passport