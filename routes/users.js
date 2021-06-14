const express = require('express')
const passport = require('../config/passport-local-strategy')
const passportGoogle = require('../config/passport-google-oauthStrategy')
const router = express.Router()
const flash = require('connect-flash');
const multer = require('multer')
const {profile, signUp ,signIn,create,createSession, 
  endSession, updateProfile, resetPassword, updatePassword} = require('../controllers/users_controller')
const fileHandler = require('../utils/fileUploadHandler')
const path = require('path')
router.use(flash())

// router.use(passport.initialize());
// router.use(passport.session());
var profileUpload = multer({
  dest : 'assets/images',
  fileFilter : function(req,file,cb){
    cb(null,true)
  }
})

router.post ('/profile/update',passport.checkAuthentication,profileUpload.single('avatar'),fileHandler,updateProfile)
router.get('/profile/:id',passport.checkAuthentication,profile)

router.get('/sign-up',signUp)
router.get('/sign-in',signIn)
router.post('/create',create)
router.post('/create-session', passport.authenticate('local',{failureFlash: true,failureRedirect : '/users/sign-in'}),createSession)
router.get('/logout',endSession)
//show reset password page
router.get('/reset-password/:token',passport.checkAuthentication, resetPassword)
router.post('/update-password',passport.checkAuthentication,updatePassword)

//google authentication
router.get('/auth/google',passportGoogle.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback', 
passportGoogle.authenticate('google', { failureRedirect: '/users/sign-in' }),
  createSession);
module.exports = router