
const {addComment,deleteComment} = require('../controllers/comment_controller')
const express = require('express')
const passport = require('../config/passport-local-strategy')
const router = express.Router()


router.post('/create',passport.checkAuthentication, addComment)
router.get('/delete/:id',passport.checkAuthentication, deleteComment)

module.exports = router