const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const User = require('../models/user')
require('dotenv').config()

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//pass in the Authorization header with value = Bearer <token>
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  //console.log('the jwt payload is ',jwt_payload);
  User.findById(jwt_payload._id,(err,user)=>{
    if(err){
      return done(err,false)
    }
    else if(user){
      //console.log('the user found in jwt authentication is ',user);
      return done(null,user)
    }else{
      return done(null,false)
    }
  })
}));


module.exports = passport