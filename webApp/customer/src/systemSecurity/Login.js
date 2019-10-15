import React, { Component } from 'react';
import { Link} from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
import $ from "jquery";
/*import particlesJS from 'react-particles-js';
*/

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
/*    particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
*/  }
  userlogin(event){
    event.preventDefault();
        var auth= {
          email       : this.refs.loginusername.value,
          password    : this.refs.loginpassword.value,
        }


    axios.post('/api/users/post/login',auth)
      .then((response)=> {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user_ID",response.data.ID);

        // localStorage.setItem("admin_email",response.data.email);
        // localStorage.setItem("admin_fullName",response.data.fullName);

/*        console.log("localStorage =",response.data.token);
*/      
        // browserHistory.replace('/');
        this.props.history.push("/");
        window.location.reload();
        // direct.setState({loggedIn:response.data.token})
        if(localStorage==null){
          swal("Invalid Email or Password","Please Enter valid email and password");
        }else{
          this.setState({
              loggedIn  :   true
          })
        }
      })
      .catch(function (error) {
          console.log(error);
        if(localStorage!==null){
          swal("Invalid Email or Password","Please Enter valid email and password");
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
    // var winHeight = window.innerHeight;
    // var divHeight = winHeight/4.5+'px';
    //   console.log("-------------------------------",this.state.loggedIn)
    
    // if(this.state.loggedIn===true){
    //   return <div></div>
    // }

    // var windowWidth = $(window).width();
    // // console.log('ww',windowWidth);
    //   if(windowWidth>=320&&windowWidth<=992){
    //     var backImage = "visible-xs col-xs-12 visible-sm col-sm-12 noBackImage"
    //     }else{
    //     var backImage = "signUpBackground hidden-xs hidden-sm"
    //   }


    // var winHeight = window.innerHeight;
    // var divHeight = 490 +'px';
    //   console.log("-------------------------------",this.state.loggedIn)
    
   



    return(  
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper loginbg">
          <div className="hidden-lg hidden-md col-sm-12 col-xs-12 addDivSignUP"></div>
        <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-7 col-sm-8 col-xs-8 col-xs-offset-2 signupPadding loginFormWrap ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divLoginInWrap">
              
            <form id="login" onSubmit={this.userlogin.bind(this)}>
              <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-4 col-xs-offset-2 ">
             {/* <h3> hhhh</h3>*/}
              {<h4 className="signInNameTitle "><span className="">Login</span></h4>
              }</div>
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                <div className="inputContent">
                  <span className="blocking-span noIb">
                    <input type="email" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 oesSignUpForm tmsLoginTextBox" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="" required/>
                    <span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email ID</span>   
                  </span> 
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 marBtm30">
                <div className="form-group form-group1 fltlft input-group col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContent ">     
                  <span className="blocking-span noIb">
                    <input type="password" className="form-control border3 pass oesSignUpForm confirmbtm inputTextPass tmsLoginTextBox" ref="loginpassword" name="loginpassword" required/>
                    <span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>                 
                  </span>
               
                <div className="showHideSignDiv">
                  <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                  <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                </div> 
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 UMloginbutton hvr-sweep-to-right" value="Login"/>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
               <div className="col-lg-6 col-md-6 col-sm-6 ">
                  <Link to='/signup' className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12"> Sign Up</Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 offset-lg-1 customFl">
                  <Link to='/forgot-pwd' className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    Forgot Password?
                  </Link>
                </div>
              </div>
{/*              <div className="col-lg-12 col-md-12 col-sm-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 ">
                  <Link to='/verify-account' className="UMGreyy UMGreyy_l forgotpass emailverify col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    OTP Verification
                  </Link>
                </div>
              </div>
*/}            </form>

          </div>
        </div>
      </div>
    );
  }
}
export default Login;