const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/to-do-list-project', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.once('open',()=>{
    console.log('we are connected to the database');
})