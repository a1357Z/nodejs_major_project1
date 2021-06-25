const Post = require('../models/post');
const User = require('../models/user')

var home = async(req,res)=>{
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

    // Post.find({}).populate('user').populate({path : 'comments', populate :{path:'user'}}).exec((err,post)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     //console.log('the post is',post);
    //     User.find({},(err,users)=>{
    //         if(err){
    //             return console.log(err);
    //         }
    //         //console.log('the posts are ',post);
    //         return res.render('home',{title : 'home Page',post , users})
    //     })
        
    // })

    try{
        let post = await Post.find({}).sort('-createdAt').populate('user').populate({path : 'comments', populate :{path:'user'}})
        // post = post.map(p => {
        //     p.likes = p.likes.length
        //     return p;
        // })
        let users = await User.find({})
        console.log('the posts are ',post);
        return res.render('home',{title : 'home Page',post , users})
    }catch(e){
        return console.log(e);
    }
    
}

module.exports = home