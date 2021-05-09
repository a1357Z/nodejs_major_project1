const addPost = require('../controllers/posts_controller')
const express = require('express')
const passport = require('../config/passport-local-strategy')
const router = express.Router()

router.post('/create', passport.checkAuthentication, addPost)

module.exports = router