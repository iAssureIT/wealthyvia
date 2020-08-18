const express 				= require("express");
const router 				= express.Router();

const checkAuth     		= require('../../coreAdmin/middlerware/check-auth.js');
const tools 			= require('../controllers/uploadurl.js');

router.post('/post'					  	, tools.insert_url);
router.get('/get/list'					, tools.get_url);
router.get('/get/:ID'					, tools.fetch_url);
router.patch('/patch/:ID'				, tools.patch_url);
router.delete('/delete/:ID'				, tools.delete_url);

module.exports = router;