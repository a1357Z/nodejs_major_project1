const express = require('express')
const passport = require('../config/passport-local-strategy')
const router = express.Router()
const flash = require('connect-flash');
const {profile, signUp ,signIn,create,createSession, endSession, updateProfile} = require('../controllers/users_controller')

router.use(flash())

// router.use(passport.initialize());
// router.use(passport.session());


router.post ('/profile/update',passport.checkAuthentication,updateProfile)
router.get('/profile/:id',passport.checkAuthentication,profile)

router.get('/sign-up',signUp)
router.get('/sign-in',signIn)
router.post('/create',create)
router.post('/create-session', passport.authenticate('local',{failureFlash: true,failureRedirect : '/users/sign-in'}),createSession)
router.get('/logout',endSession)


module.exports = router