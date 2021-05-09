const express = require('express')
const passport = require('../config/passport-local-strategy')
const router = express.Router()
const {profile, signUp ,signIn,create,createSession, endSession} = require('../controllers/users_controller')



// router.use(passport.initialize());
// router.use(passport.session());



router.get('/profile',passport.checkAuthentication,profile)

router.get('/sign-up',signUp)
router.get('/sign-in',signIn)
router.post('/create',create)
router.post('/create-session', passport.authenticate('local',{failureRedirect : '/users/sign-in'}) ,createSession)
router.get('/logout',endSession)


module.exports = router