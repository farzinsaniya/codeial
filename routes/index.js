//existing instance is fetched whenever "require('express')" is written. no new instance is create 
const express = require('express');
const router = express.Router();
//creating the access path for homeController
const homeController = require('../controllers/home_controller');
 
//checking whether the router is connected or no
console.log('router loaded successfully');

//accessing controllers/actions
router.get('/', homeController.home);


module.exports = router;