const express = require('express')
const router = express.Router()
const {profile, signUp ,signIn,create} = require('../controllers/users_controller')
const postsController = require('../controllers/posts_controller')
const signUpController = require('../controllers/signup_controller')

router.get('/profile',profile)
router.get('/posts',postsController)
router.get('/sign-up',signUp)
router.get('/sign-in',signIn)
router.post('/create',create)


module.exports = router