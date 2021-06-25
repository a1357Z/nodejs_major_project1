const Post = require('../models/post')
const Comment = require('../models/comment')
const mongoose = require('mongoose')
const Like = require('../models/like')

var addPost = async (req,res)=>{
    try{
        let post = new Post ({
            content : req.body.content,
            user : req.user._id
        })
    
        await post.save()
        //populating the user field after saving the post
        post = await Post.populate(post, {path:"user"})
        //console.log('the populated post is',post);
        //if the request is ajax then do this
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post
                },
                message :'post created'
            })
        }
        req.flash('success','post created')
        res.redirect('/')
    }catch(e){
        req.flash('error',e)
        res.redirect('/')
    }
    

    
}



let deletePost =(req,res)=>{
    //let id =mongoose.Types.ObjectId(req.params.id)
    // console.log('the post id is ',req.params.id);
    // console.log(mongoose.Types.ObjectId.isValid(req.params.id))
Post.findById(req.params.id, async (err,post)=>{
    if(err){
        return console.log('deletePost error is ',err);
    }
    //req.user.id will automatically convert the Object id into string
    if(post.user == req.user.id){
        // post.comments.forEach(comment=>{
        //     Comment.findByIdAndDelete(comment,(err,obj)=>{
        //         if(err){
        //             return console.log(err);
        //         }
        //     })
        // })
        await Like.deleteMany({onModel: 'Post', ON: post._id})
        await Like.deleteMany({onModel: 'Comment', ON:{ $in: post.comments } })
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
        if(req.xhr){
            return res.status(200).json({
                data : {
                    postId : post._id
                },
                message :'successfully deleted the post'
            })
        }
        
        req.flash('success','post deleted')
        return res.redirect('back')

    }else{
        req.flash('error',' could not delete post')
        return res.redirect('back')
    }
})
}

module.exports = {addPost,deletePost}