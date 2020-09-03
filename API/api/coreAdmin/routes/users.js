const express 		 = require("express");
const router 		 = express.Router();
const checkAuth      = require('../middlerware/check-auth.js');
const UserController = require('../controllers/users.js');

router.post('/post/signup/admin', UserController.user_signup_admin); //Working
router.post('/post/signup/user', UserController.user_signup_user); //Working
router.post('/post/signup/distributor', UserController.user_signup_distributor); //Working
router.post('/post/signup/user/emailotp', UserController.user_signup_user_email_otp); //Working
router.post('/post/login',UserController.user_login); //Working
router.post('/post/login/admin',UserController.admin_login); //Working
router.post('/post/login/distributor',UserController.distributor_login); //Working
router.patch('/patch/:ID',UserController.user_update_name_mobile);
router.patch('/patch/status/:ID',UserController.user_update_status);
router.patch('/patch/optEmail/email',UserController.update_email_otp_email);
router.patch('/patch/optEmail/:ID',UserController.update_email_otp);
router.patch('/patch/role/:action/:ID',UserController.user_update_role);
router.patch('/patch/password/email',UserController.change_password_email_verify);
router.patch('/patch/password/:ID',UserController.user_update_password_ID);
router.get('/get/list/role/:role/:pageno',UserController.fetch_users_roles);
router.get('/get/list/status/:status/:pageno',UserController.fetch_users_status);
router.get('/get/list/bydistributorcode/:role/:distributorCode',UserController.fetch_users_by_distibutorcode);
// router.get('/get/list/optemail/:optEmail/:pageno',UserController.fetch_users_status);
router.get('/get/list/:pageno',UserController.fetch_users);
router.get('/get/checkotp/:ID/:emailotp',UserController.check_EmailOTP);
router.get('/get/:ID',UserController.fetch_user_ID);
router.delete('/delete/:ID',UserController.delete_user_ID);

router.patch('/patch/distributor/resetpassword/:ID',UserController.reset_distributor_password);
router.patch('/patch/mapping/distributorcode',UserController.map_distributor_code_to_client);

router.patch('/patch/updatekyc/user/:ID',UserController.user_update_kyc);
router.patch('/patch/updaterisk/user/:ID',UserController.user_update_risk);
router.get('/get/kycrisk/user/:ID',UserController.fetch_users_kycrisk);

// router.get('/list', checkAuth,UserController.users_list); //Working

// router.get('/singleuser/:user_ID',UserController.list_cuser_framework_stage);

// router.get('/count_framework_cuser/:countfor/:company_ID/:user_ID',UserController.count_framework_cuser);

// router.get('/list/:company_ID/:role',UserController.users_list_company_role);

// router.get('/companyadmin_users_framework_list/:status/:user_ID',UserController.companyadmin_users_framework_list);

// router.post('/controlblock_cuser',UserController.controlblock_cuser);

// router.post('/user_from_company_ID/:urlfor',UserController.user_from_company_ID);


// router.delete('/delete/:userID',checkAuth,UserController.user_delete);

// router.delete('/delete',UserController.user_delete_all);

// router.get('/:userID',UserController.user_details); //Working

// router.put('/',UserController.user_update);  //Working

// router.patch('/status',UserController.user_status_update);  //Working

// // router.patch('/:rolestatus',UserController.user_change_role);  //Working
// router.patch('/changeRole',UserController.user_change_role);  //Working

// router.post('/resetpassword',UserController.user_resetpassword);  //Working

// router.get('/list/:emailID', UserController.user_byEmailId); //Working


module.exports = router;