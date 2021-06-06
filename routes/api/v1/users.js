const express = require('express')
const usersApi = require('../../../controllers/api/v1/users_api')
const router = express.Router()
const passport = require('../../../config/passport-jwt-strategy')


router.post('/create-session',usersApi)
module.exports = router