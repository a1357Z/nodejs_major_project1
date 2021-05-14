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

// var addCommentToPost = (req,res)=>{
//     console.log('addComment to post called');
//     console.log('The comment and the related post are',req.body);
//     res.end()
// }

module.exports = addPost