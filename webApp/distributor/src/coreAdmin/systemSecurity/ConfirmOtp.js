import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import $ from "jquery";

import axios from 'axios';

import './SignUp.css';

 class ConfirmOtp extends Component {
    constructor(props){
      super(props);
      this.state ={
        // "subscription" : {
        //   user         : Meteor.subscribe("userfunction"), 
        // }
      }
    }

    componentDidMount(){
      
      console.log('url in confirm----------------------> ',localStorage);
    }
     confirmOTP(event){
       event.preventDefault();
      var url = this.props.match.params;
      // console.log('confirm otp');
      var formValues ={
        "ID" :  this.props.match.params.user_ID,
        "emailotp":  parseInt(this.refs.emailotp.value)
      }
      axios.get('/api/users/get/checkotp/'+formValues.ID+'/'+formValues.emailotp)
      .then((response)=>{
        swal(response.data.message);
        this.props.history.push('/login');
/*        this.props.history.push('/reset-pwd/'+formValues.ID);
*/      })
      .catch((error)=>{
           console.log(error);
            swal("Unable to submit data ",error);
          if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/");
                }
        })
    }

    inputEffect(event){
      event.preventDefault();
      if($(event.target).val() != ""){
        $(event.target).addClass("has-content");
      }else{
        $(event.target).removeClass("has-content");
      }
    }

    resendOtp(event){

       event.preventDefault();
      var element = document.getElementById("resendOtpBtn");
      element.classList.add("btn-success");
      element.classList.remove("resendOtpColor");

            const userid = this.props.match.params.user_ID;
          axios.patch('/api/users/patch/optEmail',userid)
          .then((response)=>{
            // console.log('response', response);
            swal(response.data.message)
          })
          .catch((error)=>{
            console.log('error', error);
          }) 
   

    }


  render(){
    // if(location.pathname=='/forgotOTPVarification/'+FlowRouter.getParam("mailId")){
    //    var mobileEmail = 'Email Id';
    //    var resendOtp ='';
    // }else{
      var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
      var mobileEmail = 'Mobile Number';
      var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;
    // }

    var winHeight = window.innerHeight;
    var divHeight = winHeight/4.5+'px';

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-12 signupPadding signUpFormWrap bg-success" style={{"height": winHeight}}>
          <div className="divConfirmOtpModalWrap">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" className="firstverification">
              <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                <span>We have sent you a Verification Code to your registered <b>mobile and Email </b>.<br/><br/></span>
              </div>
              <form id="OTPMobMail" onSubmit={this.confirmOTP.bind(this)}>
                <div className="col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">
                  <div className="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter six digit verification code received on <b>Email</b>.<br/></span>
                  </div>
                  <div className="input-effect input-group veribtm1">
                    <input type="text" className="effect-21 form-control loginInputs " ref="emailotp" name="emailotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="(0|[0-9]*)" required/>
                    <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div className="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter four digit verification code received on <b>Mobile</b>.<br/></span>
                  </div>
                  <div className="input-effect input-group veribtm1">
                    <input type="text" className="effect-21 form-control loginInputs " ref="mobileotp" name="mobileotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="4" pattern="(0|[0-9]*)" required/>
                    <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
                <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">
                  <button type="submit" className="btn btn-info submitBtn col-lg-12 col-md-12 col-sm-12 col-xs-12 UMloginbutton">Submit</button>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                  <Link to='/' className="UMGrey signInbtn veriemailmr veriemail col-lg-12">Sign In</Link>  
                </div>
                <div id="resendOtpBtn" className={"col-lg-4 col-md-4 col-sm-4 col-xs-4 resendOtpColor "+resendOtpWrap}>
                  {resendOtp}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConfirmOtp;