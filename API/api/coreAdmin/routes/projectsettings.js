const express 	= require("express");
const router 	= express.Router();
const checkAuth     = require('../middlerware/check-auth.js');
const projectsettingController = require('../controllers/projectsettings');

router.post('/post/S3', projectsettingController.create_projectSettings_S3);
router.get('/get/S3', projectsettingController.fetch_projectsettings_S3);
router.get('/get', projectsettingController.fetch_projectsettings_all);
router.patch('/patch/S3', projectsettingController.patch_projectsettings_S3);
router.delete('/delete/S3', projectsettingController.delete_projectsettings_S3);

router.get('/get/:type', projectsettingController.get_projectsettings);


module.exports = router;