const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
const addTaskController = require('../controllers/addTaskController')
const deleteTaskController = require('../controllers/deleteTaskController')

router.use(express.urlencoded({ extended: true }))
router.get('/',homeController)
router.post('/add',addTaskController)
//router.delete('/delete',deleteTaskController)

module.exports = router