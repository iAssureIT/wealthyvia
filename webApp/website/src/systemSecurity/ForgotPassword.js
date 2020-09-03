import React, { Component }  from 'react';
import { Link }              from 'react-router-dom';
import swal                  from 'sweetalert';
import $                     from "jquery";
import axios                 from 'axios';

import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';

class ForgotPassword extends Component {
    constructor(){
      super();
      this.state ={
        email  : '',
        mobile  : '',
       
      }
    }
    componentDidMount(){
    }
    forgotpassword(event){
      event.preventDefault();
      var emailPbj = this.refs.enterEmail.value;
           this.setState({
            email : emailPbj,
      });
  
           axios.patch('/api/users/patch/password/email',{emailId:this.refs.enterEmail.value})
          .then((response)=> {
            //console.log("response.data.ID",response.data.ID);
            if(response.data.ID !== undefined && response.data.ID !== "undefined"){
              swal("Great","Information submitted successfully and OTP is sent to your registered Email ID");
              this.props.history.push("/confirm-otp/"+response.data.ID);
              localStorage.setItem("verify", true)

            }else{
              swal("Warning","Please check your email and try again.");
            }
           
          })
          .catch(function (error) {
            console.log(error);
            swal("Warning","Please check your email and try again.");
          })
      
     
    }

    inputEffect(event){
      event.preventDefault();
      if($(event.target).val() !== ""){
        $(event.target).addClass("has-content");
      }else{
        $(event.target).removeClass("has-content");
      }
    }

  render(){
    var winHeight = window.innerHeight;
    var divHeight = winHeight/4.5+'px';

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper loginbg">
        <div className="col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-12 signupPadding loginFormWrap">
          <div className="divForgotPasswordWrap">
             
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 verifypd">
              <h3 className="confirmTitle col-lg-offset-2"><span className="bordbt">Verify Email</span> </h3>
              <div className="FormWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 forPassWrap">
                <form id="forgotPassword" onSubmit={this.forgotpassword.bind(this)}>
                  <div className="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter registerd Email Id </span>
                  </div>
                  <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr veribtm">
                    <div className="input-effect input-group col-lg-12">
                      <input type="email" className="effect-21  form-control loginInputs" ref="enterEmail" name="enterEmail" onBlur={this.inputEffect.bind(this)} aria-label="Email Id" aria-describedby="basic-addon1" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="Please add '.' and enter only 2 or 3 characters following '.'!" required/>
                      <span className="input-group-addon glyphi-custommm"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                      <span className="focus-border">
                        <i></i>
                      </span>
                    </div>
                  </div>
                 
                  <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr">
                      <button type="submit" onClick={this.forgotpassword.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 submitBtn UMloginbutton">Send Verification Code</button>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                    <Link to='/login' className="UMGrey UMcreateacc col-lg-12 col-md-12 col-sm-12 col-xs-12">Sign In</Link>   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;