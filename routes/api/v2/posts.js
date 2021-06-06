const express = require('express')
const router = express.Router()
const {posts} =require('../../../controllers/api/v2/posts_api.js')
router.use('/',posts)

module.exports = router