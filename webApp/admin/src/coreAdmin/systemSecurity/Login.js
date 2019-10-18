import React, { Component } from 'react';
import { Link} from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
import $ from "jquery";

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://api.wealthyvia.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Login extends Component {

  constructor(){
      super();
        this.state = {           
          loggedIn : false,
          auth: {
                email           : '',
                pwd             : '',
            }
        }

  }

  componentDidMount(){
    
  }

  handleChange(event){
    // event.preventDefault();
    const target = event.target;
    const name   = target.name;
    // console.log('Name',name);
    // console.log('HChange',event.target.value);
    this.setState({
      [name]: event.target.value
    });
  }

  userlogin(event){
    event.preventDefault();
    // console.log("in login mode",this.state.auth);
        var auth= {
          email       : this.state.email,
          password    : this.state.pwd,
          
        }
        console.log("auth value",auth);

    axios
      .post('/api/users/post/login/admin',auth)
      .then((response)=> {
          console.log("-------userData------>>",response);
        if(response.data.message == "Error and Result Auth failed"){
          swal("Invalid Email or Password","Please Enter valid email and password","warning");
        }else if(response.data.message == "User not found"){
          swal("Sorry...","You are not register with this email ID","warning");
        }else{
          document.getElementById("logInBtn").value = 'We are processing...Please wait';
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("admin_id",response.data.ID);
          console.log("admin_id =",response.data.ID);
          // browserHistory.replace('/');
         this.props.history.push("/dashboard");
          window.location.reload();
         this.setState({
            loggedIn  :   true
          })
        }
      })
      .catch(function (error) {
          console.log(error);
        if(localStorage!==null){
          swal("Invalid Email or Password","Please Enter valid email and password","warning");
        }
        if(error.message === "Request failed with status code 401")
          {
               swal("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
      });
  }
  showSignPass(){
      $('.showPwd').toggleClass('showPwd1');
      $('.hidePwd').toggleClass('hidePwd1');
      return $('.inputTextPass').attr('type', 'text');
  }
  hideSignPass(){
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('.inputTextPass').attr('type', 'password');
  }
  render(){
    if(this.state.loggedIn===true){
      return <div></div>
    }
    var windowWidth = $(window).width();
    // console.log('ww',windowWidth);
    if(windowWidth>=320 && windowWidth<=992){
      var backImage = "visible-xs col-xs-12 visible-sm col-sm-12 noBackImage"
    }else{
      var backImage = "signUpBackground hidden-xs hidden-sm"
    }
    var winHeight = window.innerHeight;
    var divHeight = 490 +'px';
    // console.log("-------------------------------",this.state.loggedIn)
    
    return(
      <div>
        <div className="headerbackgroundimg col-lg-12 col-md-12 col-sm-12 col-xs-12 headerName" >Wealthyvia</div> 
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mainBackgroundImg">

        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
          <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 signupPadding signUpFormWrap " style={{"height": divHeight}}>
            <div className="divLoginInWrap">
              <form id="login" onSubmit={this.userlogin.bind(this)}>
                <br/>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm10 paddingZero">
                <h4 className="signInNameTitle "><span className="bordbt">Hi Admin, </span></h4>
                <h4 className="signInNameTitle "><span className="bordbt">Ready to Work?</span></h4>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 paddingZero">
                  <div className="inputContent">
                    <span className="blocking-span noIb">
                      <input type="email" className="form-control border3 pass oesSignUpForm inputTextPass tmsLoginTextBox oesSignUpForm tmsLoginTextBox" onChange={this.handleChange.bind(this)} ref="loginusername" id="loginusername" name="email" placeholder="" required/>
                      <span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email ID</span>   
                    </span>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 marBtm30 paddingZero">
                  <div className="form-group form-group1 fltlft input-group col-lg-12 col-md-12 col-sm-12 inputContent ">     
                    <span className="blocking-span noIb">
                      <input type="password" className="form-control border3 pass oesSignUpForm confirmbtm inputTextPass tmsLoginTextBox" onChange={this.handleChange.bind(this)} ref="loginpassword" name="pwd" required/>
                      <span className="floating-label1 lbfloatpass"><i className="fa fa-lock lockIcon" aria-hidden="true"></i> Password</span>                 
                    </span>
                  <div className="showHideSignDiv ">
                    <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                    <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                  </div> 
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 paddingZero">
                  <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 UMloginbutton " value="Login"/>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls paddingZero">
                  <div className="col-lg-6 col-md-6 col-sm-6 ">
                  </div>
             {/*     <div className="col-lg-6 col-md-6 col-sm-6 offset-lg-1 customFl">
                    <Link to='/forgot-pwd' className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      Forgot Password?
                    </Link>
                  </div>*/}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;