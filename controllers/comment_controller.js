const Comment = require('../models/comment')
const Post = require('../models/post')
const CommentMailer = require('../mailers/comments_mailers')


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
                await Comment.populate(comment,{path:'user'})
                console.log('the comment is ',comment);
                CommentMailer.newComment(comment)
                if(req.xhr){
                   return res.json({
                        data:{
                            comment
                        }
                    })
                }
                req.flash('success','comment created')
                res.redirect('/')
            }catch(e){
                return console.log(e);
            }
            
        }else{
            res.redirect('/')
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
                if(req.xhr){
                    console.log('delete xhr request');
                    return res.json({
                        data :{
                            comment
                        }
                    })
                }
                req.flash('success','comment deleted')
                return res.redirect('back')
            })
            
            
        }else{
            req.flash('error','u cannot delete this comment')
            return res.redirect('back');
        }
    })
}