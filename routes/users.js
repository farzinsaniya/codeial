const { Router } = require('express');
const express =  require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');


//mapping the controller
router.get('/profile/:id', passport.checkAuthentication, userController.profile);

//mapping the signup controller
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);

//mapping the create-session controller
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    //strategy
    'local',
    {failureRedirect: '/users/sign-in'}, 
), userController.createSession);

//Removing the user’s session cookie to remove the identity
router.get('/sign-out', userController.destroySession);


module.exports = router;