const express 				= require("express");
const router 				= express.Router();
const checkAuth     		= require('../../coreAdmin/middlerware/check-auth.js');
const OfferingController 	= require('../controllers/offerings.js');

router.post('/post', OfferingController.create_offerings);
router.get('/get/name/:offeringTitle', OfferingController.fetch_offering_name);
router.get('/get/:ID', OfferingController.fetch_offering);
router.get('/get/all/:pageno', OfferingController.fetch_offering_all);
router.get('/get/all/type/:type/:pageno', OfferingController.fetch_offering_all_type);
router.get('/get/all/list/type/:type/:pageno', OfferingController.fetch_offering_all_type_list);
router.get('/get/all/list/:pageno', OfferingController.fetch_offering_all_list);
router.patch('/patch/:ID', OfferingController.patch_offering);
router.delete('/delete/:ID', OfferingController.delete_offering);


module.exports = router;