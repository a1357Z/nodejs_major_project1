const mongoose = require('mongoose')
const env = require('./environment')
mongoose.connect(`mongodb://localhost/${env.db}`,{ useUnifiedTopology: true , useNewUrlParser : true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'error connecting to the database'))
db.once('open',()=>{
    console.log('connected to the database');
})

module.exports = db