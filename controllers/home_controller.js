const Post = require('../models/post');
const { post } = require('../routes');

var home = (req,res)=>{
    //console.log(req.cookies);
    //res.cookie('security','505Biatch')

    
    // Post.find({},(err,posts)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     //console.log(posts);
    //     posts.forEach(post => {
    //         post.populate('user' ).exec((err,post)=>{
    //             if(err){
    //                 return console.log(err);
    //             }
    //             console.log('the post is',post);
    //         })
    //     });
    // })

    Post.find({}).populate('user').populate({path : 'comments', populate :{path:'user'}}).exec((err,post)=>{
        if(err){
            return console.log(err);
        }
        //console.log('the post is',post);
        console.log('the posts are ',post);
        return res.render('home',{title : 'home Page',post})
    })
    
}

module.exports = home