import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
// Section: 1 - SystemSecurity ******************************************************
import Login            from '../systemSecurity/Login.js';
import ConfirmOtp       from '../systemSecurity/ConfirmOtp.js';
import ForgotPassword   from '../systemSecurity/ForgotPassword.js';
import ResetPassword    from '../systemSecurity/ResetPassword.js';
import SignUp           from '../systemSecurity/SignUp.js';
import VerifyAccount    from '../systemSecurity/VerifyAccount.js';
import Header           from '../common/header/Header.js'
import Footer           from '../common/footer/Footer.js'
import Dashboard        from '../dashboard/Dashboard.js'
import Leftsidebar      from '../common/leftSidebar/Leftsidebar.js'
import Rightsidebar     from '../common/rightSidebar/Rightsidebar.js'
import UMListOfUsers    from '../userManagement/UM/UMListOfUsers.js';
import UMListOfUsers2   from '../userManagement/UM/UMListOfUsers2.js';
import EditUserProfile  from '../userManagement/UM/EditUserProfile.js';
import UMRolesList      from '../userManagement/Roles/UMRolesList.js';
import CompanySetting   from '../companysetting/Components/CompanySetting.js';
import ViewTemplates    from '../NotificationManagement/ViewTemplates.js';
import addWorkspace     from '../../cofficAdmin/WorkspaceManagement/addWorkspace.js';
import WorkInProgressPage from "../../cofficAdmin/WorkspaceManagement/WorkInProgressPage.js";
import addSubscription    from '../../cofficAdmin/Subscription/addSubscription.js';
import editSubscription   from '../../cofficAdmin/Subscription/editSubscription.js';
import Amenities          from '../../cofficAdmin/Amenities/Amenities.js';
import cafeMenu           from '../../cofficAdmin/CafeMenu/cafeMenu.js';
import AdminContent       from '../dashboard/DashboardNew.js';
/*============================ /Blog==============================================*/

/*import Rightsidebar     from '../common/rightSidebar/Rightsidebar.js';*/
/*import BlogsFormPage    from "../Blog/BlogsForm/BlogsFormPage.js";*/


/*******************************Dashboard Reports*****************************/



import BankReport             from '../dashboardReports/bankReport/BankReport.js';
import CafewiseCheckIns       from '../dashboardReports/cafeWiseCheck-Ins/CafeWiseCheck-Ins.js';
import CafeWiseCheckInD       from '../dashboardReports/cafeWiseCheck-Ins/CafeWiseCheckInD.js';
import CafeWiseCheckOut       from '../dashboardReports/cafeWiseCheck-Out/CafeWiseCheck-Out.js';
import CafeWiseCheckOutD      from '../dashboardReports/cafeWiseCheck-Out/CafeWiseCheckOutD.js';
import CafeWiseSeatBookingS   from '../dashboardReports/cafeWiseSeatBookingS/CafeWiseSeatBookingS.js';
import CafeWiseSeatBookingD   from '../dashboardReports/cafeWiseSeatBookingD/CafeWiseSeatBookingD.js';
import SalesTransactionReport from '../dashboardReports/salesTransactionReport/SalesTransactionReport.js';
import SettlementReportD      from '../dashboardReports/settlementReportD/SettlementReportD.js';
import SettlementReportS      from '../dashboardReports/settlementReportS/SettlementReportS.js';
import AllCafeUsersSeatBooking     from '../dashboardReports/cafeWiseSeatBookingD/AllCafeUsersSeatBooking.js';

class Layout extends Component{
  constructor(props) {
    super();
    this.state = {
          loggedIn  : false, 
          logout    : true
    }
      this.updateState = this.updateState.bind(this);
  }
   
componentDidMount(){
    console.log('this.props',this.props);

    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           $('#sidebar').toggleClass('active');
           $('#imgSidebar').toggleClass('custm1');
       });
    });
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           $('#headerid').toggleClass('headereffect');
       });
    });
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           $('#dashbordid').toggleClass('dashboardeffect');
       });
    });
    const token = localStorage.getItem("token");
    // console.log("Dashboard Token = ",token);
    if(token!==null){
    // console.log("*********===***********imin ",token);
      this.setState({
        loggedIn : true,
        logout   : false
      })
    }        
  }

  updateState(data){
    this.setState({
      "logout"    : data,
      "loggedIn"  : false
    })
  }

  logout(){
    var token = localStorage.removeItem("token");
      if(token!==null){
      console.log("Header Token = ",token);
      this.setState({
        loggedIn : false
      })
      // browserHistory.push("/login");
      this.props.history.push("/login");
    }
  }

  render(){
    if(this.state.loggedIn && !this.state.logout){
      return(
          <Router>
            <div className="App container-fluid">
              <div className="row">
                <div id="headerid" className="headerbackgroundcolor">
                  <div className="">
                    <Header systemlogout={this.updateState} />
                 </div>
                </div>
                <div id="dashbordid" className="col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mainContentBottom">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mainContentBackground">                  
                        <Switch>
                          <Route path="/" component={AdminContent} exact />                
                          <Route path="/dashboard" component={AdminContent} exact />                
                          <Route path="/umlistofusers" component={UMListOfUsers2} exact />
                          <Route path="/umroleslist" component={UMRolesList} exact />
                          <Route path="/edituserprofile/:id" component={EditUserProfile} exact />
                          <Route path="/ViewTemplates" component={ViewTemplates} exact />
                          <Route path="/dashboard" component={Dashboard} exact />
                          <Route path="/companysetting" component={CompanySetting} exact />
                          <Route path="/addWorkspace" component={addWorkspace} exact />
                          <Route path="/addWorkspace/:id" component={addWorkspace} exact />
                          <Route path="/reports" component={WorkInProgressPage} exact />
                          <Route path="/addSubscription" component={addSubscription} exact />
                          <Route path="/addSubscription/:id" component={addSubscription} exact />
                          <Route path="/editSubscription" component={editSubscription} exact />
                          <Route path="/amenities" component={Amenities} exact />
                          <Route path="/amenities/:id" component={Amenities} exact />
                          <Route path="/cafeMenu" component={cafeMenu} exact />
                          <Route path="/cafeMenu/:id" component={cafeMenu} exact />
                          <Route path="/bankReport" component={BankReport} exact />

                          <Route path="/cafeWiseCheck-In/:workspace_ID" component={CafeWiseCheckInD} exact />
                          <Route path="/cafeWiseCheckIn" component={CafewiseCheckIns} exact />
                          <Route path="/cafeWiseCheck-Out/:workspace_ID" component={CafeWiseCheckOutD} exact />
                          <Route path="/cafeWiseCheckOut" component={CafeWiseCheckOut} exact />
                          <Route path="/dashboard/cafeWiseSeatBookingDetailed/:workspace_ID" component={CafeWiseSeatBookingD} exact />
                          <Route path="/dashboard/cafeWiseSeatBookingDetailed" component={CafeWiseSeatBookingD} exact />
                          <Route path="/dashboard/allCafeUsersSeatBooking" component={AllCafeUsersSeatBooking} exact />
                          <Route path="/dashboard/cafeWiseSeatBookingSummary" component={CafeWiseSeatBookingS} exact />
                          <Route path="/dashboard/salesTransactionReport" component={SalesTransactionReport} exact />
                          <Route path="/settlementReportDetailed/:vendor_ID" component={SettlementReportD} exact />
                          <Route path="/settlementReportSummary" component={SettlementReportS} exact />
                        </Switch>        
                      </div>
                    </div>
                  </div>
                  <div className="footerCSS col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                    <Footer />
                  </div>
                </div>
                <div className="leftsidebarbackgroundcolor">
                  <div className="row">
                    <Leftsidebar />
                  </div>
                </div>
              </div>
            </div> 
          </Router>
        );
    }else{
       return(
        <div>
          <Router>
            <Switch>
            
                    <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/"               exact strict component={ Login } />
              <Route path="/login"          exact strict component={ Login } />
              <Route path="/signup"         exact strict component={ SignUp } />
              <Route path="/forgot-pwd"     exact strict component={ ForgotPassword } />
              <Route path="/reset-pwd"      exact strict component={ ResetPassword } />
              <Route path="/verify-account" exact strict component={ VerifyAccount } />
              <Route path="/confirm-otp"    exact strict component={ ConfirmOtp } />
            </Switch>        
          </Router>
        </div>
      );
    }
  }
}
export default Layout;
