const express = require('express')
const router = express.Router()

router.get('/toggle', require('../controllers/likes_controller'))

module.exports = router