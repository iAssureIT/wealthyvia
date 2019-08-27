import React, { Component } from 'react';
import $         from 'jquery';

import "./ContactUs.css";

export default class ContactUs extends Component {

  constructor(props) {
    super(props);
        this.state = {
        };
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
 
  } 

  render() {

    return (
          <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorWhite contactUsBody">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LabelContactUs row">
                <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactspan" >Contact Us</span>
                <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><i class="fa fa-envelope"></i>&nbsp;&nbsp;wealthyvia@gmail.com</span>
                <span  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><i class="fa fa-globe"></i>&nbsp;&nbsp;www.wealthyvia.com</span>
                <span  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><i class="fa fa-mobile" aria-hidden="true"></i> &nbsp;&nbsp;+91 9372120785 / +91 7892729130</span>
              </div>
                
              <form className="col-lg-10 col-md-12 col-sm-12 col-xs-12  contactUsForm ">
                 <div className="row">
                  <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 marginBottom" >
                    <div className="row">
                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 heading">Topic </label>
                       <select className="custom-select customSelectContact col-lg-8 ">
                        <option  className="hidden" >Select an inquiry</option>
                        <option>Client Inquiry</option>
                        <option>Linking an account</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                   <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 marginBottom">
                    <div className="row">
                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 heading">Name </label>
                      <input type="text" className="customSelectContact col-lg-4"  placeholder="First Name"/>
                      <input type="text" className="customSelectContact col-lg-4"  placeholder="Last Name"/>

                    </div>
                  </div>
                    <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 marginBottom">
                    <div className="row">
                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 heading">Email Address </label>
                      <input type="text" className="customSelectContact col-lg-8"  placeholder="Enter Address"/>

                    </div>
                  </div>
                   <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 marginBottom">
                    <div className="row">
                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 heading">Mobile Number </label>
                      <input type="text" className="customSelectContact col-lg-8"/>

                    </div>
                  </div>
                   <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 mt10">
                    <div className="row">
                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 heading">Message </label>
                      <textarea rows="7"  className="col-lg-8"></textarea>

                    </div>
                  </div>
                   <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 mt10">
                    <div className="row">
                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 heading"> </label>
                      <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2  sendButton">Send</div>

                    </div>
                  </div>
                 </div>
              </form>
          </div>
    );
  }
}
