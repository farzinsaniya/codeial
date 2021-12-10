const { Router } = require('express');
const express =  require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

//mapping the controller
router.get('/profile', userController.profile);


module.exports = router;