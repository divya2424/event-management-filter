var express = require('express'); // Making Object Of Express
var router = express.Router(); // Using Routing Function of Express
var userController = require('../controllers/event'); //Making Object of Controllers


router 
  .post('/postlist',userController.postEvent)
  .post('/filterDiscount',userController.filterDiscount)
  .get('/getList',userController.getEvents);


module.exports = router; // Exporting router