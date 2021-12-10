//install express - step1
//require express using file - step2

const express = require('express');
const app = express();
const port = 8000;

//using express routers
app.use('/', require('./routes'));

//setting up the VIEW ENGINE
app.set('view engine', 'ejs');
app.set('view', './views');
app.listen(port, function(err){
    if (err) {
        console.log('error occurred.', err);
    }

    console.log('app is listening.');
    console.log(`server is running on port no ${port}`);
});