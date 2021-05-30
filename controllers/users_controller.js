const User = require('../models/user')
const ProfilePic = require('../models/profilePic')

var profile = (req,res)=>{
    console.log('res.locals is ',res.locals);
    User.findById(req.params.id,async (err,user)=>{
        if(err){
            return console.log(err);
        }
        let profilePic = await ProfilePic.findOne({user : req.user._id})
        console.log('profilePic is ',profilePic);
        if(profilePic){
            return res.render('users-profile',{title: 'users profile',profile_user : user,profilePic : profilePic.fileName })
        }else{
            return res.render('users-profile',{title: 'users profile',profile_user : user, profilePic : undefined})
        }
        
    })
    // res.render('users-profile',{title: 'users profile',user : res.locals.user})
}

//render signup page
var signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
     }
    res.render('user_sign_up',{title : 'Codeial | Sign Up'})
}

//render signin page
var signIn = (req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
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
    // console.log('the modified request after authentication is ',req);
    // console.log('the cookies are ',res.cookies);
    req.flash('success','successful signin')
    return res.redirect('/')
}

var endSession = async(req,res)=>{
    req.logout()
    req.flash('success','successful signout')
    res.redirect('/')

    // req.session.destroy(err=>{
    //     if(err){
    //         return console.log(err);
    //     }
        
    //     return res.redirect('/users/sign-in')
    // })
    
}

var updateProfile = async(req,res)=>{
    
    try{
        await User.findOneAndUpdate({_id : req.user._id},{name : req.body.name, email : req.body.email})
        req.flash('success','profile updated')
        res.redirect('back')
    }catch(e){
        console.log(e);
        return 
    } 
}


module.exports = {profile, signUp ,signIn, create,createSession, endSession,updateProfile}