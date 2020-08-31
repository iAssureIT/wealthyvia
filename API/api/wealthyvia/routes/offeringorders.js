const express 			= require("express");
const router 			= express.Router();
const checkAuth     	= require('../../coreAdmin/middlerware/check-auth.js');
const OfferingOrderController 	= require('../controllers/offeringorders.js');

router.post('/post', OfferingOrderController.create_order);
router.post('/payment-response/:order_id', OfferingOrderController.payment_response);
router.get('/paymentOrderDetails/all', OfferingOrderController.paymentOrderDetails_all);
router.get('/paymentOrderDetails/:paymentOrderId', OfferingOrderController.paymentOrderDetails);
router.get('/paymentOrderDetailsUser/:userId', OfferingOrderController.paymentOrderDetails_user);
router.get('/get/allpaymentorder/byclientist', OfferingOrderController.get_clientRevenue);

module.exports = router;