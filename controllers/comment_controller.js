const Comment = require('../models/comment')
const Post = require('../models/post')

// const axios = require('axios')
// module.exports = addComment = (req,res)=>{
//     //console.log(req.body.name);
//     Comment.create({
//         comment : req.body.comment,
//         user : req.user._id,
//         post : req.body.post
//     }, async(err,obj)=>{
//         if(err){
//             return console.log('error is ',err);
//         }
//         console.log('created comment ',obj);
//         try{
//             await axios.post('http://localhost:8000/posts/addCommentToPost',{
//                 postId : req.body.post,
//                 commentId : obj._id
//             })
//             res.redirect('back');
//         }catch(e){
//             return console.log(e);
//         }
        
       
//     })
// }


module.exports.addComment =(req,res)=>{
    Post.findById(req.body.post, async(err,post)=>{
        if(err){
            return console.log(err);
        }
        if(post){
            try{
                let comment = await Comment.create({
                    comment : req.body.comment,
                    user : req.user._id,
                    post : req.body.post
                })
                // Post.findOneAndUpdate({_id : post._id},{comments : [...post.comments, comment._id ]})
                post.comments.push(comment._id)
                post.save()
                res.redirect('/')
            }catch(e){
                return console.log(e);
            }
            
        }
    })
}

module.exports.deleteComment=(req,res)=>{
    Comment.findById(req.params.id,async (err,comment)=>{
        if(err){
            return console.log(err);
        }
        if(comment.user == req.user.id){
            // let post = await Post.findById(comment.post)
            // let newCommentsArray = post.comments.filter(comment=>comment !== req.params.id)
            // post.comments= newCommentsArray
            // await post.save()

            Post.findByIdAndUpdate(comment.post,{$pull : {comments : req.params.id}},async(err,obj)=>{
                await comment.remove()
                return res.redirect('back')
            })
            
            
        }else{
            return res.redirect('back');
        }
    })
}