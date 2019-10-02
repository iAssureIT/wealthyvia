import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import swal from 'sweetalert';
import $ from "jquery";
import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

class ResetPassword extends Component {

  constructor(){
      super();
        this.state = {           
        
        }
    }
    changepassword(event) {
      event.preventDefault();
      var password        = this.refs.resetPassword.value;
      var passwordConfirm = this.refs.resetPasswordConfirm.value;
      var user_id = this.props.match.params;

      if(password==passwordConfirm){
        if(password.length >= 6){
        axios
          .post('/api/users/patch/password/'+user_id,password)
          .then((response)=> {
              var responseData = response.data;
              if(responseData=="Password Changed successfully"){
                swal("Your password has been updated!","","success");
                this.props.history.push('/');
              }
          })
          .catch(function (error) {
              console.log(error);
              swal("Invalid current password.","","warning");
          })
        }else{
              swal({
                title: "password should be at least 6 characters long",
                text: "Please try again",
                timer: 1700,
                showConfirmButton: false,
                type: "error"
            });
        }
      }else{
         swal({
                title: 'Passwords does not match',
                text: 'Please try again',
                timer: 1700,
                showConfirmButton: true,
                type: 'error'
            });
      }
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
  showSignPassC(){
    $('.showPwdC').toggleClass('showPwd1C');
    $('.hidePwdC').toggleClass('hidePwd1C');
    return $('.inputTextPassC').attr('type', 'text');
  }
  hideSignPassC(){
    $('.showPwdC').toggleClass('showPwd1C');
    $('.hidePwdC').toggleClass('hidePwd1C');
    return $('.inputTextPassC').attr('type', 'password');
  }

  render(){
    var winHeight = window.innerHeight;
    var divHeight = winHeight/4.5+'px';

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-12 signupPadding signUpFormWrap bg-success" style={{"height": winHeight}}>
          <div className="divResetPasswordWrap">
            <h3 className="resetpwdNameTitle"> <span className="bordbt">RESET PASSWORD</span></h3>
            <div className="FormWrapper1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <form id="resetPassword" onSubmit={this.changepassword.bind(this)}>
                <div className="form-group loginFormGroup pdleftclr veribtm col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-addon addons glyphi-custommmLeft" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input type="password" className="form-control loginInputs inputTextPass" ref="resetPassword" name="resetPassword" placeholder="New Password" aria-label="Password" aria-describedby="basic-addon1" title="Password should be at least 6 characters long!" pattern=".{6,}" required/>
                    <span className="input-group-addon addons glyphi-custommm padBoth" id="basic-addon1">
                      <i className="fa fa-eye Pass showPwd" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                      <i className="fa fa-eye-slash Pass hidePwd" aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                    </span>
                  </div>
                </div>
                <div className="form-group loginFormGroup pdleftclr veribtm col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-addon addons glyphi-custommmLeft" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input type="password" className="form-control loginInputs inputTextPassC" ref="resetPasswordConfirm" name="resetPasswordConfirm" placeholder="Confirm New Password" aria-label="Confirm Password" aria-describedby="basic-addon1" title="Password should be at least 6 characters long!" pattern=".{6,}" required/>
                    <span className="input-group-addon addons glyphi-custommm padBoth" id="basic-addon1">
                      <i className="fa fa-eye Pass showPwdC" aria-hidden="true" onClick={this.showSignPassC.bind(this)}></i>
                      <i className="fa fa-eye-slash Pass hidePwdC" aria-hidden="true" onClick={this.hideSignPassC.bind(this)}></i>
                    </span>
                  </div>
                </div>
                <div className="submitButtonWrapper pdleftclr col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button type="submit" onClick={this.changepassword.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 submitBtn UMloginbutton">Reset Password</button>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                   <Link to='/' className="UMGrey signInbtn col-lg-12 col-md-12 col-sm-12 col-xs-12">Sign In</Link>   
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;