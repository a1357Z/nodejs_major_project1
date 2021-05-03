const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
// router.use((req,res,next)=>{
//     console.log('router loaded');
//     next()
// })

router.get('/',homeController)
router.use('/users',require('./users'))

module.exports = router