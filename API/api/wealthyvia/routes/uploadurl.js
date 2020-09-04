const express 				= require("express");
const router 				= express.Router();

const checkAuth     		= require('../../coreAdmin/middlerware/check-auth.js');
const tools 				= require('../controllers/uploadurl.js');

router.post('/post'					  	, tools.insert_url);
router.post('/get/all/list/bydate'		, tools.fetch_tool_list_bydate);
router.get('/get/list'					, tools.get_url);
router.get('/get/:ID'					, tools.fetch_url);
router.get('/get/search/list/:searchtext', tools.search_tool);
router.patch('/patch/:ID'				, tools.patch_url);
router.delete('/delete/:ID'				, tools.delete_url);
router.patch('/patch/pinorder/:ID'		, tools.patch_pinOrder);

module.exports = router;