import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import swal     from 'sweetalert';
import $        from "jquery";
import axios    from 'axios';

import './confirmpartnerotp.css';

class ConfirmPartnerEmailOtp extends Component {
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
    var formValues ={
      "ID"        :  this.props.match.params.user_ID,
      "emailotp"  :  parseInt(this.refs.emailotp.value)
    }
    axios.get('/api/distributormaster/get/checkotp/'+formValues.ID+'/'+formValues.emailotp)
    .then((response)=>{
              if(response.data.message == 'SUCCESS'){
                var distributor = response.data.distributor;
                //console.log("res after otpcheck",response);
                axios.get("/api/users/get/list/role/admin/1")
                    .then((adminusers) => {
                      //console.log('admin data', adminusers.data);
                      var adminemaillist = [];
                      var admindata = adminusers.data;
                      if(admindata && admindata.length > 0){
                        for(let i = 0 ; i < admindata.length ; i++){
                          adminemaillist.push(admindata[i].email);
                        }
                      }
                      console.log("admin email list", adminemaillist);
                      const formValues2 = {
                        "emaillist"     : adminemaillist ,
                        "subject"       : "Distributor joined Wealthyvia!",
                        "text"          : "", 
                        "mail"          : 'Dear Admin,' + '<br/>'+
                                          'A Distributor has joined Wealthyvia as a Partner!'+                          
                                          "<br/>"+
                                          "Please Approve/Reject Distributor's Profile after reviewing it. Following are the details of the Distributor:<br/>"+ 
                                          "Name: " + distributor.firstname +' '+ distributor.lastname+  "<br/>" +
                                          "Email:  " + distributor.email.address + "<br/>" +
                                          "Contact:  " + distributor.phone + "<br/>" +
                                          "<br/><br/> " +
                                          "Regards<br/> " +
                                          "Team Wealthyvia. " ,
                                          

                      };
                      console.log("notification",formValues2); 
                      
                        axios
                        .post('/send-email-admin',formValues2)
                        .then((res)=>{
                                  if(res.status === 200){
                                    //console.log("Mail Sent TO ADMIN successfully!")
                                  }
                                })
                                .catch((error)=>{
                                  console.log("error = ", error);
                                  
                                });

                      const formValues1 = {
                        "email"         : distributor.email.address ,
                        "subject"       : "Welcome to Wealthyvia!",
                        "text"          : "", 
                        "mail"          : 'Dear' + distributor.firstname +' '+ distributor.lastname + ', <br/><br/>'+                          
                                          "Thank you for joining Wealthyvia as a Partner! <br/> " + 
                                          "Your Partner Profile will be approved soon by Admin & you will be notified with your login credentials after approval." +
                                          "<br/> <br/> " + 
                                          "Regards<br/> " +
                                          "Team Wealthyvia. " ,

                      };
                      console.log("notification",formValues1); 
                      
                        axios
                        .post('/send-email',formValues1)
                        .then((res)=>{
                                   if(res.status === 200){
                                    this.props.history.push('/'); 

                                   // this.props.history.push('/'); 
                                   //  Swal("Thank you for contacting us. We will get back to you shortly.")
                                    }
                                })
                                .catch((error)=>{
                                  console.log("error = ", error);
                                  
                                });        

                      swal( "Thank you for submitting your information.","We will get back to you very shortly.", "success");
                  })
                  .catch((error) => { console.log('user error: ',error)})

              }
              else{
                swal("OTP not matched ", "Please enter correct OTP", "error" );
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
    //console.log("userid", userid);
    axios.patch('/api/distributormaster/update/optEmail/'+userid)
    .then((response)=>{
      // console.log('response', response);
      swal("","New OTP is sent to your registered Email ID.");
    })
    .catch((error)=>{
      console.log('error', error);
    })    
  }


  render(){
    
      var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
      var mobileEmail = 'Mobile Number';
      var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper loginbg">
        <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-7 col-sm-12 signupPadding signUpFormWrap">
          <div className="divConfirmOtpModalWrap">
        
              <div className="text-center ">
                <h4 className="confirmTitle "><span className="bordbt">Confirm OTP</span></h4>
              </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" className="firstverification">
              <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                <span><strong>We have sent you a Verification Code to your registered </strong><b> Email </b><br/><br/></span>
              </div>
              <form id="OTPMobMail" onSubmit={this.confirmOTP.bind(this)}>
                <div className="col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">
                  <div className="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter four digit verification code received on <b>Email</b>.<br/></span>
                  </div>
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
                
               { <div id="resendOtpBtn" className={"col-lg-4 col-md-4 col-sm-4 col-xs-4 resendOtpColor "+resendOtpWrap}>
                  {resendOtp}
                </div> }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConfirmPartnerEmailOtp;