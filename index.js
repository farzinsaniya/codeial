//MAIN PAGE OF THE WEB APP

//starting the app
const express = require('express');
const app = express();

//acquiring environment
const env = require('./config/environment');

//defining the port
const port = 8000;


//requiring the libraries
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//cors
const Cors = require('cors');
app.use(Cors());

//setting up the chat server
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

//setting up another server for the port to listen
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

//acquiring paths
const path = require('path');

//loading the sass
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

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


//setting up the path for static files
app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//setting up the VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

//initialize passport
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//initialize flash
app.use(flash());
app.use(customMware.setFlash);

//using express routers, setting up the path for it
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err) {
        console.log('error occurred.', err);
    }

    console.log('app is listening.');
    console.log(`server is running on port no ${port}`);
});