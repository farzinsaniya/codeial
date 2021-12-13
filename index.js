//install express - step1
//require express using file - step2

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//The express. urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());

//setting up the cookie parser
app.use(cookieParser());

//including/importing DB
const db = require('./config/mongoose');


//including the installed library
app.use(expressLayouts);

//extract th css and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//using express routers, setting up the path for it
app.use('/', require('./routes'));

//setting up the path for static files
app.use(express.static('./assets'));

//setting up the VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err){
    if (err) {
        console.log('error occurred.', err);
    }

    console.log('app is listening.');
    console.log(`server is running on port no ${port}`);
});