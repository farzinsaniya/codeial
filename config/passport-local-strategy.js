//importing the authentication library
const passport = require('passport');

//importing the passport-local library
const LocalStrategy = require('passport-local').Strategy;

//importing users
const User = require('../models/user');

//authentication using passport.js ---> asking passport.js to use its local-strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
            function(req, email, password, done){
                //find a user and establish the identity
                User.findOne({email: email}, function(err, user){
                    if (err) {
                        //if email doesn't match
                        //console.log('error in finding the user using ---> Passport');
                        req.flash('error', err);
                        return done(err);
                    }
                        //if passwords doesn't match
                    if (!user || user.password != password) {
                        //console.log('Invalid Username/Password!');
                        req.flash('error', 'Invalid Username/Password');
                        return done(null, false);
                    }

                    //if user is found
                    return done(null, user);
                });
            }
));


//serializing the user to decide which key is to be kept in cookie
//passport shall be using the serializing function to set it into a cookie
//id is send to the cookie when the user authenticates his/her-self
passport.serializeUser(function(user, done){
    //when no error is found
    done(null, user.id);
});


//deserializing the user from the key in cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding the user using ---> Passport');
            return done(err);
        }

            return done(null, user);

    });
});

//check if the user is authenticated
//used as middleware
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in suer from the session cookie 
        res.locals.user = req.user
    }
    next();
}


//exporting
module.exports = passport;