const express 	= require("express");
const router 	= express.Router();
const checkAuth     = require('../middlerware/check-auth.js');
const RoleController = require('../controllers/roles.js');

router.post('/post', RoleController.create_role);
router.get('/get/list', RoleController.list_role);
router.get('/get/:ID', RoleController.detail_role);
router.put('/put/:ID',RoleController.update_role);
router.delete('/delete/all',RoleController.delete_all_role);
router.delete('/delete/:ID',RoleController.delete_role);


module.exports = router;