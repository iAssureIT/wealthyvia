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
import Login              from '../systemSecurity/Login.js';
import ConfirmOtp         from '../systemSecurity/ConfirmOtp.js';
import ForgotPassword     from '../systemSecurity/ForgotPassword.js';
import ResetPassword      from '../systemSecurity/ResetPassword.js';
import SignUp             from '../systemSecurity/SignUp.js';
import VerifyAccount      from '../systemSecurity/VerifyAccount.js';
import Distributorprofile   from '../systemSecurity/Distributorprofile.js';
import Header             from '../common/header/Header.js';
import Footer             from '../common/footer/Footer.js';
import Dashboard          from '../dashboard/Dashboard.js';
import Clientlist         from '../dashboard/Directclients/Clientlist.js';
import ClientTable        from '../dashboard/ClientTable/ClientTable.js';
import AboutUsVideo       from "../dashboard/Tools/AboutUsVideo.js"; 
import Leftsidebar        from '../common/leftSidebar/Leftsidebar.js';
import Rightsidebar       from '../common/rightSidebar/Rightsidebar.js';

import AdminContent       from '../dashboard/DashboardNew.js';
import Myprofile          from '../dashboard/Myprofile/Myprofile.js';
import Editprofile          from '../dashboard/Myprofile/Editprofile.js';
/*============================ /Blog==============================================*/

/*import Rightsidebar     from '../common/rightSidebar/Rightsidebar.js';*/

/*******************************Dashboard Reports*****************************/



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
    var userid = localStorage.removeItem("user_id");
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
                <div id="headerid" className="headerbackgroundcolor backColorGrey">
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
                          <Route path="/dashboard" component={Dashboard} exact />
                          <Route path="/ClientTable" component={ClientTable} exact />
                          <Route path="/dashboard" component={Dashboard} exact />
                          <Route path="/myprofile" component={Myprofile} exact />
                          <Route path="/editprofile" component={Editprofile} exact />
                          <Route path="/myclients" component={Clientlist} exact />
                          <Route path="/tools"          exact strict component={AboutUsVideo}  /> 
                          <Route path="/"               exact strict component={ Login } />
                          <Route path="/login"          exact strict component={ Login } />
                          <Route path="/signup"         exact strict component={ SignUp } />
                          <Route path="/forgot-pwd"     exact strict component={ ForgotPassword } />
                          <Route path="/reset-pwd"      exact strict component={ ResetPassword } />
                          <Route path="/verify-account" exact strict component={ VerifyAccount } />
                          <Route path="/confirm-otp"    exact strict component={ ConfirmOtp } />
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
            
              <Route path="/"               exact strict component={ Login } />
              <Route path="/login"          exact strict component={ Login } />
              <Route path="/signup"         exact strict component={ SignUp } />
              <Route path="/forgot-pwd"     exact strict component={ ForgotPassword } />
              <Route path="/reset-pwd"      exact strict component={ ResetPassword } />
              <Route path="/verify-account" exact strict component={ VerifyAccount } />
              <Route path="/confirm-otp"    exact strict component={ ConfirmOtp } />
              <Route path="/edit-partner-profile"    exact strict component={ Distributorprofile } />
            </Switch>        
          </Router>
        </div>
      );
    }  
           
  }
}
export default Layout;
