const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
//exporting a module which will help us extract JWT from the header
const ExtractJWT = require('passport-jwt').ExtractJWT;
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'
}

passport.use(new JWTstrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err, user) {
        if (err) {
            console.log('Error in finding the user using JWT');
            return;
        }
        if (user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;
