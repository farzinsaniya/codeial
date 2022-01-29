const mongoose = require('mongoose');
const env = require('./environment');

//connecting to the DB
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting to the DB!!!'));

db.once('open', function(){
    console.log('Connected to DB :: MongoDB :) ')
});

module.exports = db;