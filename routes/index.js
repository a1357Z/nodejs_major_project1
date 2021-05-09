const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
const userRouter = require('./users')
const postRouter = require('./posts')

router.get('/',homeController)
router.use('/users',userRouter)
router.use('/posts',postRouter)

module.exports = router