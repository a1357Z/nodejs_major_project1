const Post = require('../models/post')
const Comment = require('../models/comment')

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

let deletePost =(req,res)=>{
Post.findById(req.params.id, async (err,post)=>{
    //req.user.id will automatically convert the Object id into string
    if(post.user = req.user.id){
        // post.comments.forEach(comment=>{
        //     Comment.findByIdAndDelete(comment,(err,obj)=>{
        //         if(err){
        //             return console.log(err);
        //         }
        //     })
        // })

        Comment.deleteMany({post : req.params.id},(err)=>{
            if(err){
                return console.log(err);
            }
        })

        // Post.findByIdAndDelete(req.params.id,(err,obj)=>{
        //     if(err){
        //         return console.log(err);
        //     }
        //     res.redirect('back')
        // })
        await post.remove()
        return res.redirect('back')

    }else{
        return res.redirect('back')
    }
})
}

module.exports = {addPost,deletePost}