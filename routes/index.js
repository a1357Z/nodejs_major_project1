const express = require('express')
const router = express.Router()

//getting the controllers
const homeController = require('../controllers/homeController')
const addTaskController = require('../controllers/addTaskController')
const deleteTaskController = require('../controllers/deleteTaskController')

router.use(express.urlencoded({ extended: true }))

//handling the requests
router.get('/',homeController)
router.post('/add',addTaskController)
router.post('/delete',deleteTaskController)

module.exports = router