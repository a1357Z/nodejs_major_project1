const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
module.exports.index = async (req, res) => {
  try {
    let post = await Post.find({})
      .sort('-createdAt')
      .populate({path : 'user', select : 'email name createdAt updatedAt'})
      .populate({ path: 'comments', populate: { path: 'user' } })

      console.log('the posts are ',post);

    res.json(200, {
      message: 'posts api controller',
      posts: post,
    })
  } catch (e) {
    return console.log(e)
  }
}

module.exports.deletePost = (req, res) => {
  Post.findById(req.params.postId, async (err, post) => {
    try {
      if (err) {
        return console.log('deletePost error is ', err)
      }
      // console.log('the post is ',post);
      // console.log('the user is ',req.user);
      if(post.user.toString() === req.user._id.toString()){
        Comment.deleteMany({ post: req.params.postId }, (err) => {
          if (err) {
            return console.log(err)
          }
        })
  
        await post.remove()
        res.json({message: 'successfully deleted the post and associated comments'})
      }else{
        return res.json({message : 'you are not authorized to delete this post'})
      }
     
    } catch (e) {
      res.json({ message: "error in delteing posst", body : e })
      throw e
    }
  })
}
