const addPost = require('../controllers/posts_controller')
const addComment = require('../controllers/comment_controller')
const express = require('express')
const passport = require('../config/passport-local-strategy')
const router = express.Router()

router.post('/create', passport.checkAuthentication, addPost)
// router.post('/comments',passport.checkAuthentication, addComment)
// router.post('/addCommentToPost',passport.checkAuthentication, addCommentToPost)

module.exports = router