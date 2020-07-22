const express 			= require("express");
const router 			= express.Router();
const checkAuth     	= require('../../coreAdmin/middlerware/check-auth.js');
const OrderController 	= require('../controllers/subscriptionorders.js');

router.post('/post', OrderController.create_order);
router.post('/payment-response/:order_id', OrderController.payment_response);
router.get('/paymentOrderDetails/all', OrderController.paymentOrderDetails_all);
router.get('/paymentOrderDetails/:paymentOrderId', OrderController.paymentOrderDetails);
router.get('/paymentOrderDetailsUser/:userId', OrderController.paymentOrderDetails_user);

module.exports = router;