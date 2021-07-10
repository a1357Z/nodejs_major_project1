const rfs = require('rotating-file-stream')
const fs = require('fs')
const path = require('path')

const logDirectory = path.join(__dirname, '../productionLogs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log',{
  interval: '1d',
  path: logDirectory,
})

const production = {
  name: process.env.CODEIAL_ENVIRONMENT,
  asset_path: process.env.CODEIAL_ASSET,
  session_cookie_key:process.env.CODEIAL_SESSION_COOKIE,
  db:process.env.CODEIAL_DB,
  google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  gmail_username:process.env.CODEIAL_GMAIL_USERNAME,
  gmail_password:process.env.CODEIAL_GMAIL_PASSWORD,
  jwt_secret: process.env.CODEIAL_SECRET,
  morgan:{
    mode: 'combined',
    options: {stream: accessLogStream }
  }
}

module.exports = production