const express 	= require("express");
const router 	= express.Router();

const productchartController = require('../controllers/productrates.js');
const checkAuth = require('../../coreAdmin/middlerware/check-auth.js');



router.post('/bulk_upload_productrates',productchartController.bulk_upload_productrates);
router.get('/get/rates/:productID',productchartController.get_productratesbyproductid);
router.get('/get/ratesoneproduct/:productID',productchartController.get_productrates);

router.get('/get/filedetails/:productID/:fileName/:uploadTime',productchartController.filedetails);

router.post('/get/files',productchartController.fetch_file); 
router.get('/get/files/count/:productID',productchartController.fetch_file_count);
router.delete('/file/delete/:productID/:fileName/:uploadTime',productchartController.delete_file);



module.exports = router;