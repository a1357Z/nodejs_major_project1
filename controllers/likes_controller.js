const Like = require('../models/like')
const Comment = require('../models/comment')
const Post = require('../models/post')

const toggleLike = async (req, res) => {
  try {
    console.log('inside toggleLike');
    //likes/toggle?id=1234&type=Post
    let likeable = req.query.type
    let id = req.query.id.toString()
    // console.log('likeable is ',likeable);
    // console.log('id is ',id);
    // console.log('typeof id is ',typeof id);
    let deleted = false
    let like = await Like.findOne({ON:id, onModel: likeable, user: req.user._id})
    if(like){
      
      if(likeable === "Comment"){
        let comment = await Comment.findOneAndUpdate({_id: id},{$pull: {likes: like._id}},{new: true})
        //console.log('like removed from comment', comment);
      }else{
        let post = await Post.findOneAndUpdate({_id: id},{ $pull: {likes: like._id}},{new: true})
        //console.log('like removed from post', post);
      }
      await like.remove() // test if this works
      deleted = true
    }else{
      like = await Like.create({
        user: req.user._id,
        ON: id,
        onModel:likeable 
      })
      console.log('like created is ',like);
      if(likeable === 'Comment'){
        let comment = await Comment.findOneAndUpdate({_id: id},{$push: {likes: like._id }},{new: true})
        //console.log('comment after adding like is',comment);
      }else{
        let newPost = await Post.findOneAndUpdate({_id: id},{$push: {likes: like._id }},{new:true})
        //console.log('post after adding the like is ',newPost);
      }
    }
    return res.json({
      message: 'operation successful',
      data: {
        deleted
      }
    })
  } catch (error) {
    console.log('error in toggleLike',error);
    res.json({ message: 'internal server error'})
  }
}

module.exports = toggleLike