import React,{Component}  from 'react';
import { render }         from 'react-dom';
import axios              from "axios";
import $                  from "jquery";
import swal               from 'sweetalert';
import Rightsidebar       from '../rightSidebar/Rightsidebar.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Header.css';

export default class Header extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
        vendorId : "",
        cafeName : "",
        name     : "",
        email    : "",
        mobile   : "",
        logo     : "",
    }
  }
   
  componentDidMount() {
   var Uid = localStorage.getItem("admin_id");
   
    axios.get("/api/users/get/"+Uid)
      .then((response)=>{ 
        console.log("response==>", response.data);
          this.setState({
              userinfo : response.data
          })

      })
      .catch((error)=>{
      })
   
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";

  }
  logout(){
      var token = localStorage.removeItem("token");
      if(token!==null){
      this.setState({
        loggedIn : false,
        
      },()=>{
        this.props.systemlogout(true)

      })
      this.props.history.push("/login");
    }
  }
  LogoutSectionHover(event){
    $('.showme').toggle(); 
  }

  resetpassword(event){
    event.preventDefault();
    var formvalues= {
      emailId : this.state.userinfo.email
    }
    axios.patch('/api/users/patch/optEmailadmin/verify', formvalues)
        .then((response)=> {
          // console.log("response");
          // swal("Great","OTP has been sent to admin's email. To get OTP please contact Pritam Deuskar.");
          // ?his.props.history.push("/resetpwd/confirmotp");
          swal({
              title: "",
              text: "OTP has been sent to admin's email. To get OTP please contact Pritam Deuskar.",
              type: "success"
              }).then(function() {                                  
                 window.location = "/resetpwd/confirmotp";
                 // window.location.reload();
              });
          // window.location = "/resetpwd/confirmotp";
                 // window.location.reload();
         
        })
        .catch(error=> {
          
            
          swal("Something went wrong..","Unable to submit data.","warning");
         
        })  
    }

  render(){
    return(
    <div>
            <header className="pageHeader">
              <div className=""> 
                <div className="col-lg-6 col-md-4 col-sm-4 col-xs-4  ">
                  <div className="">
                   <div id="sidebarCollapse" className="col-lg-1 col-md-1 col-sm-1 col-xs-1 hover ">
                      <i className="fa fa-bars headicon"></i>
                    </div>
                   <div  className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                     <h3 className="LogoTitle" id="LName">Wealthivia</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-8 col-sm-8 col-xs-8 ">
                  <div className="row">
                    <div onClick={this.openNav.bind(this)}className="col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right hover">
                    <i className="fa fa-cogs headicon "></i>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-9 col-xs-12 pull-right logoutAct">
                    <div className="row">
                      {/*<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 pull-right">
                          {/*<img src="../images/cofficLogo.png" className="img"/>
                        </div>
                      </div>*/}
                      <div className="col-lg-10 col-md-10 col-xs-8 col-sm-12 pull-right hover" onClick={this.LogoutSectionHover.bind(this)}>
                        <div className="headiconName pull-right">Wealthyvia Admin&nbsp;&nbsp;<i className="fa fa-angle-down"></i></div>
                      </div>
                      <div className="arrow-up showme"></div>
                      <div className="col-lg-12 user-footer showme">
                        <div className="profiledetails">
                          <p className="pull-right fntC" style={{"cursor":"pointer"}} onClick={this.LogoutSectionHover.bind(this)} title="Close">X</p>
                        </div>
                        <div className="profiledetails">
                          <p>Name: {this.state.userinfo ?this.state.userinfo.fullName :null}</p>
                          <p>Mobile: {this.state.userinfo ?this.state.userinfo.mobNumber :null}</p>
                          <p>Email: {this.state.userinfo ?this.state.userinfo.email :null}</p>
                        </div> 
                        <div className="logoutDiv">
                      {/*    <div className="pull-left" data-toggle="modal" aria-labelledby="myModals" data-target="#myModals" aria-hidden="true">
                            <p className="btn btnhvr btn-Profile ">Reset Password</p>
                          </div>*/}
                          <div className="pull-right">
                            <a href="" className="btn btnhvr btn-logout" onClick={this.resetpassword.bind(this)}>
                              Reset Password
                            </a> &nbsp;&nbsp;
                            <a href="/login" className="btn btnhvr btn-logout" onClick={this.logout.bind(this)}>
                              Logout
                            </a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right hover">
                    {/*<i className="fa fa-bell  headicon "><span className="label label-warning labelhead ">0</span></i>*/}
                  </div>
                </div>
              </div> 
            </div>
            </header>
          <div id="mySidenav" className="sidenav ">
         <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)} ><i className="closeSidebr fa fa-window-close pull-right" aria-hidden="true"></i></a>
         <Rightsidebar/>
        </div>
      </div>
    );
  }
}
