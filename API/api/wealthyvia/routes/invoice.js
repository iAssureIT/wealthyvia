const express 			= require("express");
const router 			= express.Router();
const checkAuth     	= require('../../coreAdmin/middlerware/check-auth.js');
const OrderController 	= require('../controllers/invoice.js');

router.post('/post', OrderController.create_invoice);
router.get('/get', OrderController.get_invoice);

module.exports = router;