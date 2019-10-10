// import React,{Component}                         from 'react';
// // import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { render }                                from 'react-dom';
// import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
// import $                                         from "jquery";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

// import Login            from '../systemSecurity/Login.js';
// import Log            from '../systemSecurity/log.js';

// import ConfirmOtp       from '../systemSecurity/ConfirmOtp.js';
// import ForgotPassword   from '../systemSecurity/ForgotPassword.js';
// import ResetPassword    from '../systemSecurity/ResetPassword.js';
// import SignUp           from '../systemSecurity/SignUp.js';
// import VerifyAccount    from '../systemSecurity/VerifyAccount.js';


// import Header                      from '../common/header/Header.js';
// import Footer                      from '../common/footer/Footer.js'
// import SideBarProfile              from '../common/sidebar/SideBarProfile.js'
// import Dashboard                   from '../dashboard/Dashboard.js'
// import Leftsidebar                 from '../common/leftSidebar/Leftsidebar.js'
// import Rightsidebar                from '../common/rightSidebar/Rightsidebar.js'

// import UMListOfUsers               from '../userManagement/UM/UMListOfUsers.js';
// import EditUserProfile             from '../userManagement/UM/EditUserProfile.js';
// import UMRolesList                 from '../userManagement/Roles/UMRolesList.js';
// import CompanySetting              from '../companysetting/Components/CompanySetting.js';
// import ViewTemplates               from '../NotificationManagement/ViewTemplates.js';

// import AddModuleFacility           from '../accessManagement/AddModuleFacility.js';
// import AssignPermissionToModules   from '../accessManagement/AssignPermissionToModules.js';

// import FormIndex                   from "../../HRMS/empInduction/empForms/FormIndex.js"
// // import ProfileSidebar              from "../../HRMS/empInduction/empForms/profileSidebar/ProfileSidebar.js"
// import ProfilePreview              from '../../HRMS/empInduction/profilePreview/ProfilePreview.js';
// import RoleApproval                from "../../HRMS/empInduction/HRAllocation/HRManagerApproval/RoleApproval.js"
// import RoleAllocation              from "../../HRMS/empInduction/HRAllocation/roleAllocationByHR/RoleAllocation.js"
// import EmployeeList                from "../../HRMS/empInduction/HRAllocation/roleAndDept/EmployeeList.js"
// import DocVerification             from "../../HRMS/empInduction/HRAllocation/docVerification/DocVerification.js"


// import ManageLocation              from "../../coreAdmin/masterData/manageLocation/ManageLocation.js"
// import Department                  from '../../coreAdmin/masterData/department/Department.js';
// import Designation                 from '../../coreAdmin/masterData/designation/Designation.js';
// import Diseases                    from '../../coreAdmin/masterData/diseases/Diseases.js';
// import Grade                       from '../../coreAdmin/masterData/grade/Grade.js';
// import Languages                   from '../../coreAdmin/masterData/languages/Languages.js';
// import Category                    from '../../coreAdmin/masterData/category/Category.js';
// import Religion                    from '../../coreAdmin/masterData/religion/Addreligion.js';

// class Layout extends Component{
  
//   constructor(props) {
//    super(props);
//     this.state = {}
//   }
   
//   componentDidMount(){
//     $(document).ready(function () {
//       $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//       });
//     });

//     $(document).ready(function () {
//       $('#sidebarCollapse').on('click', function () {
//         $('#headerid').toggleClass('headereffect');
//       });
//     });
//     $(document).ready(function () {
//       $('#sidebarCollapse').on('click', function () {
//         $('#dashbordid').toggleClass('dashboardeffect');
//       });
//     });
//   }

//   render(){
//     return(
//       <div className="App container-fluid">
//           <div className="row">
//             {/*<div id="headerid" className="headerbackgroundcolor ">
//               <Header />  
//             </div>
//             <div>
//               <sidebar/>
//             </div>*/}
//             <div className="">
//               <div id="dashbordid" className="">
//                 <Router>
//                   <Switch>


//                     <Route path="/"               exact strict component={ Log } />
//                     <Route path="/loginpage"          exact strict component={ Login } />
//                     {/*<Route path="/signup"         exact strict component={ SignUp } />*/}
//                     {/*<Route path="/forgot-pwd"     exact strict component={ ForgotPassword } />
//                     <Route path="/reset-pwd"      exact strict component={ ResetPassword } />
//                     <Route path="/verify-account" exact strict component={ VerifyAccount } />
//                     <Route path="/confirm-otp"    exact strict component={ ConfirmOtp } />

//                     <Route path="/" component={Dashboard} exact />
//                   {/*Admin Routes*/}
                   
//                   {/*Access Management*/}
                    
//                   {/*EmpInduction*/} 
//                                    {/*Master Data*/}
                                      
// */}
//                   </Switch>        
//                 </Router>
//               </div>
//             </div>
           
//             <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
//               <div className="">
                
//              </div>
//             </div>
//               </div>
//           </div>
// /*      </div>
// */    );
//   }
// }
// export default Layout;