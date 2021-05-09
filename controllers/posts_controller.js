const Post = require('../models/post')

var addPost = (req,res)=>{
    const post = new Post ({
        content : req.body.content,
        user : req.user._id
    })

    post.save((err)=>{
        if(err){
            return console.log('error is ',err);
        }
        
    })
    res.redirect('/')
}

module.exports = addPost