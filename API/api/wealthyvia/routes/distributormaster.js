const express 				= require("express");
const router 				= express.Router();

const checkAuth     		= require('../../coreAdmin/middlerware/check-auth.js');
const distributormaster 	= require('../controllers/distributormaster.js');

router.post('/post'					  	, distributormaster.create_distributor);
router.get('/get/one/:ID'				, distributormaster.fetch_distributor_name);
router.get('/get/list/:status'			, distributormaster.fetch_distributor_list);
router.get('/get/list'					, distributormaster.fetch_All_distributor_list);
router.patch('/patch/:ID'				, distributormaster.patch_distributor);
router.delete('/delete/:ID'				, distributormaster.delete_distributor);
router.patch('/set/status'				, distributormaster.setstatus_distributor);
router.post('/post/distributor/emailotp', distributormaster.distributor_join_email_otp);
router.get('/get/checkotp/:ID/:emailotp', distributormaster.check_DistributorEmailOTP);
router.patch('/update/optEmail/:ID'      , distributormaster.distributor_update_email_otp);
router.get('/get/one/byuserid/:ID'		, distributormaster.fetch_distributor_by_userid);
router.patch('/patch/additionalinfo/:ID', distributormaster.add_additional_info_distributor);
//**************************Set status approve or reject *************************//


module.exports = router;