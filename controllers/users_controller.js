const User = require('../models/user')

var profile = (req,res)=>{
    res.render('users-profile',{title: 'users profile'})
}

//render signup page
var signUp = (req,res)=>{
    res.render('user_sign_up',{title : 'Codeial | Sign Up'})
}

//render signin page
var signIn = (req,res)=>{
    res.render('user_sign_in',{title : 'Codeial | Sign In'})
}

//get the signup data
var create = (req,res)=>{
if(req.body.password !== req.body.confirm_password){
    return res.redirect('back')
}
User.findOne({email : req.body.email},(err,user)=>{
    if(err){
        return console.log('error in finding user');
    }
    if(!user){
        console.log(req.body);
        User.create(req.body,(err,user)=>{
            if(err){
                return console.log('error in creating user',err);
            }
           return  res.redirect('/users/sign-in')
        })
    }else{
       return  res.redirect('back')
    }
})

}

//log in the user
var createSession =(req,res)=>{

}

module.exports = {profile, signUp ,signIn, create,createSession}