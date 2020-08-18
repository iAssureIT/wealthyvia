import React,{Component}  from 'react';
import { render }         from 'react-dom';
import axios              from "axios";
import $                  from "jquery";
import swal               from 'sweetalert';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Profileheader.css';

export default class Profileheader extends Component{
  
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
   var Uid = localStorage.getItem("user_id");
   
    axios.get("/api/users/get/"+Uid)
      .then((response)=>{ 
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

  render(){
    return(
    <div className="row">
        <div className="headerbackgroundimg col-lg-12 col-md-12 col-sm-12 col-xs-12 headerName" >
          <img id="imgSidebar" className="marLeft25" src="/images/WealthyVia_Logo.png" alt="Logo_img" height="40%" width="20%"/>
              <div className="col-lg-3 col-md-3 col-sm-9 col-xs-12 pull-right logoutAct">
                    
                      <div className="col-lg-10 col-md-10 col-xs-8 col-sm-12 pull-right hover" onClick={this.LogoutSectionHover.bind(this)}>
                        <div className="headiconName pull-right">Wealthyvia Distributor&nbsp;&nbsp;<i className="fa fa-angle-down"></i></div>
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
                          <div className="pull-right">
                            <a href="/login" className="btn btnhvr btn-logout" onClick={this.logout.bind(this)}>
                              Logout
                          </a> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </div> 
        
    );
  }
}
