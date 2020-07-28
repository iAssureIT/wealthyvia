const express 				= require("express");
const router 				= express.Router();
const checkAuth     		= require('../../coreAdmin/middlerware/check-auth.js');
const ResearchReportController 	= require('../controllers/researchreport.js');

router.post('/post', ResearchReportController.create_researchreport);
router.get('/get/:ID', ResearchReportController.fetch_researchreport);
router.get('/get/all/:pageno', ResearchReportController.fetch_researchreport_all);
router.get('/get/all/list/:pageno', ResearchReportController.fetch_researchreport_all_list);
router.get('/get/search/list/:searchtxt', ResearchReportController.search_researchreport);
router.patch('/patch/:ID', ResearchReportController.patch_researchreport);
router.delete('/delete/:ID', ResearchReportController.delete_researchreport);


module.exports = router;