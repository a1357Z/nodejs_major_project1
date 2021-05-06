const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/codeial_development',{ useUnifiedTopology: true , useNewUrlParser : true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'error connecting to the database'))
db.once('open',()=>{
    console.log('connected to the database');
})

module.exports = db