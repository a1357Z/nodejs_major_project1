const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
var createSession =async(req,res)=>{
  try{
    let user = await User.findOne({email:req.body.email})
    if(!user || user.password != req.body.password){
      res.status(422).json({message: 'invalid email or password'})
    }
    // console.log('the user is with toJSON',user.toJSON());
    // console.log('the user is ',user);
    res.json({message : 'signin successful',
      data : {
        token: jwt.sign(user.toJSON(),process.env.JWT_SECRET,{expiresIn : '10000000'})
      }
    })
  }catch(e){
    throw e
  }
  
}

module.exports = createSession