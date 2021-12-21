const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

//creating or adding a comment
router.post('/create', passport.checkAuthentication, commentsController.create);
//deleting or destroyin the comment
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;