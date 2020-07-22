const express 	= require("express");
const router 	= express.Router();

const productchartController = require('../controllers/productrates.js');
const checkAuth = require('../../coreAdmin/middlerware/check-auth.js');



router.post('/bulk_upload_productrates',productchartController.bulk_upload_productrates);
router.get('/get/rates/:productID',productchartController.get_productratesbyproductid);
router.post('/get/rates',productchartController.get_productrates);

router.get('/get/filedetails/:productID/:fileName',productchartController.filedetails);




module.exports = router;