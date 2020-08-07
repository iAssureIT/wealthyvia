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

//**************************Set status approve or reject *************************//


module.exports = router;