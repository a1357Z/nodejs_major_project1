const express = require('express')
const postsApi = require('../../../controllers/api/v1/posts_api')
const router = express.Router()
const passport = require('../../../config/passport-jwt-strategy')


//passport.authenticate('jwt', { session: false }),
router.get('/',  postsApi.index)
router.delete('/:postId',passport.authenticate('jwt',{session:false}),postsApi.deletePost)

module.exports = router