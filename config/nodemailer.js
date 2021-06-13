const nodemailer = require('nodemailer')
const Promise = require('bluebird');
const ejs = Promise.promisify(require('ejs').renderFile)
const path = require('path')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port : 587,
  secure: false,
  auth:{
    user: process.env.GMAIL_ID, //email id registered with gmail
    pass: process.env.GMAIL_PASSWORD //this will be the password for your email id. also using env variables as replacement gives error here.
  }
})

let renderTemplate = async (data,relativePath) => {
  let mailHtml = await  ejs(
    path.join(__dirname,'../views/mailers',relativePath),
    data
  )
  return mailHtml
}

module.exports = {transporter, renderTemplate}