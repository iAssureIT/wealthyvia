const express 	= require("express");
const router 	= express.Router();
const checkAuth     = require('../middlerware/check-auth.js');
const projectsettingController = require('../controllers/projectsettings.js');

router.post('/post', projectsettingController.create_projectSettings);
router.get('/get/:type', projectsettingController.fetch_projectsettings);
router.post('/getS3Details/:type', projectsettingController.fetch_projectsettings);
router.get('/get/all', projectsettingController.fetch_projectsettings_all);
router.patch('/patch/:type', projectsettingController.patch_projectsettings);
router.delete('/delete/:type', projectsettingController.delete_projectsettings);

router.patch('/S3', projectsettingController.insertS3Data);


module.exports = router;