const mongoose = require('mongoose');

//connecting to the DB
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting to the DB!!!'));

db.once('open', function(){
    console.log('Connected to DB :: MongoDB :) ')
});

module.exports = db;