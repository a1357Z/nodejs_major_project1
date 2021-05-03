const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
const userRouter = require('./users')

router.get('/',homeController)
router.use('/users',userRouter)

module.exports = router