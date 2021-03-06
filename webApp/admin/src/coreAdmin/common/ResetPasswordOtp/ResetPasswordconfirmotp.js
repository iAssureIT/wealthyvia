import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import swal     from 'sweetalert';
import $        from "jquery";
import axios    from 'axios';

// import './SignUp.css';

class ResetPassowrdconfirmotp extends Component {
    constructor(props){
      super(props);
      this.state ={
       
      }
    }
  componentDidMount(){
    if(!this.props.match.params.user_ID){
      return(
        <div className="col-lg-12"> Hello</div>

        )
    }
  }
  confirmOTP(event){
    event.preventDefault();
    // var url = this.props.match.params;
    // console.log('confirm otp');
    var Uid = localStorage.getItem("admin_id");
    var formValues ={
      "ID"        :  Uid,
      "emailotp"  :  parseInt(this.refs.emailotp.value)
    }
    axios.get('/api/users/get/checkotp/'+formValues.ID+'/'+formValues.emailotp)
    .then((response)=>{
      // console.log("response",response);
      if(response.data.message === 'FAILED'){
        swal("OTP not matched","Please enter correct OTP", "error");
      }
      else{
          const token = localStorage.getItem("token");
          
            this.props.history.push('/resetpwd/reset');
            window.location.reload();
          }
      
      
    })
    .catch((error)=>{
      console.log('error', error);
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
    
     /* var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
      var mobileEmail = 'Mobile Number';
      var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;
*/
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
        <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-12 signupPadding signUpFormWrap bg-success" style={{"height": "400px"}}>
          <div className="divResetPasswordWrap">
            <h3 className="resetpwdNameTitle"> <span className="bordbt">Confirm OTP</span></h3>
            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                
                  <span><strong>We have sent you a Verification Code to admin </strong><b>Email </b><br/><br/></span>
                
                <form id="OTPMobMail" onSubmit={this.confirmOTP.bind(this)}>
                  <div className="form-group loginFormGroup pdleftclr veribtm col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    
                      <span>Enter four digit verification code received on <b>Email</b>.<br/></span>
                    
                    <div className="input-effect input-group veribtm1">
                      <input type="text" className="effect-21 form-control loginInputs " ref="emailotp" name="emailotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="(0|[0-9]*)" required/>
                      <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                      <span className="focus-border">
                        <i></i>
                      </span>
                    </div>
                  </div>
                  <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">
                    <button type="submit" className="btn btn-info submitBtn col-lg-12 col-md-12 col-sm-12 col-xs-12 UMloginbutton">Submit</button>
                  </div>
                  
                 {/* <div id="resendOtpBtn" className={"col-lg-4 col-md-4 col-sm-4 col-xs-4 resendOtpColor "+resendOtpWrap}>
                    {resendOtp}
                  </div>*/}
                </form>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}
export default ResetPassowrdconfirmotp;