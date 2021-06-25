const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
const userRouter = require('./users')
const postRouter = require('./posts')
const commentRouter = require('./comments')
const passport = require('../config/passport-local-strategy')

router.get('/',passport.setAuthenticatedUser,homeController)
router.use('/users',userRouter)
router.use('/posts',postRouter)
router.use('/comments',commentRouter)
router.use('/likes',require('./likes'))
router.use('/api',require('./api'))

module.exports = router