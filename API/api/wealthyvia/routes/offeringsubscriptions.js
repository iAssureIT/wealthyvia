const express 			 = require("express");
const router 			 = express.Router();
const checkAuth     	 = require('../../coreAdmin/middlerware/check-auth.js');
const OfferSubController = require('../controllers/offeringsubscriptions.js');

router.post('/post',OfferSubController.create_offerSub_wsSub);
router.get('/get/alloffersub',OfferSubController.list_offerSub);
router.get('/get/:user_ID',OfferSubController.list_offerSub_wsSub);
router.get('/get/offer_wise_status/:offeringID/:status',OfferSubController.list_offer_wise_status);
router.patch('/patch/update_statements/:offeringSubID',OfferSubController.update_statements);

module.exports = router;
