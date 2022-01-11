const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell PASSPORT to use a anew strategy for google login
passport.use(new googleStrategy({
    //copy from the created credentials
    clientID: "860103775447-5r8bipe5qkfs2i1b4b41qcp37llg57m7.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
//refreshToken is a special kind of token that can be used to obtain a renewed access token
    function (accessToken, refreshToken, profile, done) {
        //find a user
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
                if (err) {
                    //if an error occurs
                    console.log('error in google-strategy-passport' , err);
                    return;
                }
                console.log(profile);

                if (user) {
                    //if user is found set the user as req.user
                    return done(null, user);
                }else{
                    //if not found, create the user and set the user as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, function(err, user){
                            if (err) {
                    console.log('error in creating user using google-strategy-passport' , err);
                    return;
                }
                return done(null, user);
                    });
                }
        });
    }
));


module.exports = passport;