import React, { Component }     from 'react';
import $                        from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';

import "./Footer.css";

export default class Footer extends Component {

  constructor(props) {
    super(props);
        this.state = {
          "message" : "",
          "emailId" : "",
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
 
  } 
  handleChange(event){
    this.setState({
      emailId : this.refs.email.value,
    })
  }
  submitEmail(event){
      /* ======================= Send Email to user ==================================*/
      var adminEmail = "kycwealthyvia@gmail.com";
      const dataArray = {
          "email"         : this.state.emailId ,
          "subject"       : "Your query is sent successfully!",
          "message"       : "", 
          "mail"          : "Thank you....!<br/><br/>Your query has been successfully delivered to the admin! We will get back to you shortly. <br/> <br/> " + 
                            "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,
                           
        };
      
       axios
        .post('/send-email',dataArray)
        .then((res)=>{
                   if(res.status === 200){
                    swal("Thank you for contacting us. We will get back to you shortly.")
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
       console.log("dataArray",dataArray); 
       const formValues2 = {
        "email"         : adminEmail ,
        "subject"       : "New query/feedback arrived from client.",
        "message"          : "",
        "mail"          : 'Dear Admin, <br/>'+
                          "New query came from client! <br/> <br/> " + 
                          "<b>Client Email: </b>"  + this.state.emailId + '<br/><br/>'+
                          " This is a system generated email.please do not replay! " ,

        };
        axios
        .post('/send-email',formValues2)
        .then((res)=>{
                  if(res.status === 200){
                    console.log("Mail sent to admin successfully!")
                  }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });

      this.refs.email.value = "";
       /* ======================= Send Email to user ==================================*/
  }

  render() {

    return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite footerContainer ">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 footerDivFirst">
                  <label>Products</label>
                  <ul>
                      <li><a href="/#5gcpm">5GCPM Portfolio</a></li>
                      <li><a href="/#safeHevenMoats">Safe Heavan Stocks</a></li>
                      <li> <a href="/#safeHeven">Safe Heavan Stocks + Alpha</a></li>
                     <li> <a href="#">Nifty Algo Tranding</a></li>
                     <li> <a href="/#unlistedPre">USA Stocks Portfolio</a></li>
                     <li> <a href="/#uslistedStocks">Unlisted Stocks</a></li>
                     <li> <a href="#">Multibagger</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 footerDivFirst">
                  <label>Company</label>
                  <ul>
                    <a href="/about-us"><li >About Us</li></a>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 footerDivFirst">
                  <label>Get In Touch</label>
                  <ul>
                   <a href="/contact-us"><li >Contact Us</li></a>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 footerDivFirst">
                  <label>Hear about wealthyvia tips, experience & more</label>
                   <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 inputContainerEH ">
                     <input type="text" className="customInput col-lg-10 col-md-10 col-sm-10 col-xs-10" ref="email" placeholder="Enter Email Address" onChange={this.handleChange.bind(this)}/>
                      <span className="searchIcon col-lg-2 col-md-2 col-xs-2 col-sm-2 " onClick={this.submitEmail.bind(this)}><i className="fa fa-chevron-right iconS"></i></span>
                    </div>
                  <div className="hidden-lg hidden-md  col-sm-10 col-xs-12">
                    <div className="row">
                     <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook ">
                            <img src="/images/linkedin1.png"/>
                      </div> 
                      <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook ">
                         <img src="/images/facebook.png"/>
                      </div>
                      <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook  ">
                        <img src="/images/twitter.png"/>
                      </div> 
                      <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook ">
                         <img src="/images/snapchat.png"/>
                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        <img src="/images/instagram.png"/>
                      </div>
                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook  ">
                         <img src="/images/pinterest.png"/>
                      </div>                    
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-6 col-xs-5 imgContainer row">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/appstore.png"/>
                      </div>
                      <div className="col-lg-4 col-md-5 col-md-offset-1 col-sm-4 col-xs-3  col-xs-offset-3 imgContainer">
                        <img src="https://wealthyvia.s3.ap-south-1.amazonaws.com/website/googleplay.png"/>
                      </div>
                    </div>
                </div>
              </div>
            </div>
    );
  }
}
