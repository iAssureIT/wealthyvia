const express 			 = require("express");
const router 			 = express.Router();
const checkAuth     	 = require('../../coreAdmin/middlerware/check-auth.js');
const WMSubController 	 = require('../controllers/wmsubscriptions.js');

router.get('/get/wmsublist/:status',WMSubController.listwmSub_list_statuswise);
router.get('/get/detaillistoffersub/:wmsubID',WMSubController.detaillistoffersub);
router.patch('/patch/:wmsubID',WMSubController.upload_performance_doc);

module.exports = router;
