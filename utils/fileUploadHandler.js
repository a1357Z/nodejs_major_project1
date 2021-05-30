const ProfilePic = require('../models/profilePic')
const fs = require('fs')
const path = require('path')
module.exports = async function fileHandler(req, res, next) {
  let profilePic = await ProfilePic.findOne({ user: req.user._id })
  if (profilePic) {
    let p = path.join(__dirname,`../assets/images/${profilePic.fileName}`)
    console.log('path for deleting the old pic is ',p);
    fs.unlinkSync(p)
    profilePic.fileName = req.file.filename
    await profilePic.save()
    console.log('profilePic updated is ', profilePic)
  } else {
    profilePic = await ProfilePic.create({
      fileName: req.file.filename,
      user: req.user._id,
    })
    console.log('profilePic created is ', profilePic)
  }

  next()
}
