//existing instance is fetched whenever "require('express')" is written. no new instance is create

//ROOT ROUTER

const express = require('express');
const router = express.Router();
//creating the access path for homeController
const homeController = require('../controllers/home_controller');



//checking whether the router is connected or no
console.log('router loaded successfully');

//accessing controllers/actions
router.get('/', homeController.home);

//accessing the user controller and passing on the profile param
// complete URL: localhost:8000/users/profile
router.use('/users',require('./users'));

//accessing posts
router.use('/posts', require('./posts'));

//accessing comments
router.use('/comments', require('./comments'));

//accessing api
router.use('/api', require('./api'));

module.exports = router;