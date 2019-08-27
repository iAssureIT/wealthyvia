import React, { Component } from 'react';
import $         from 'jquery';

import "./Footer.css";

export default class Footer extends Component {

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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite footerContainer mt20 ">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 footerDivFirst">
                <label>PRODUCTS</label>
                <ul>
                    <li>Student Loan Refinancing</li>
                    <li>Medical/Dental Resident Refinancing</li>
                    <li>Parent PLUS Refinancing</li>
                   <li> Private Student Loans</li>
                   <li> Undergraduate Student Loans</li>
                   <li> Graduate Student Loans</li>
                   <li> Parent Student Loans</li>
                   <li> Personal Loans</li>
                   <li> Home Loans</li>
                   <li> Mortgage</li>
                   <li> Mortgage Refinance</li>
                   <li> SoFi Invest®</li>
                   <li> Stock Bits</li>
                   <li> Active Investing</li>
                   <li> Automated Investing</li>
                   <li> ETFs</li>
                   <li> SoFi Protect</li>
                   <li> Renters Insurance</li>
                   <li> Homeowners Insurance</li>
                   <li> Auto Insurance</li>
                   <li> Life Insurance</li>
                   <li> SoFi Money®</li>
                   <li> SoFi Relay</li>
                </ul>


                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 footerDivFirst">
                  <label>COMPANY</label>
                  <ul>
                  <li>About Us</li>
                  <li>How it Works</li>
                  <li>Reviews</li>
                  <li>Press</li>
                  <li>Jobs</li>
                  <li>Blog</li>
                 <li> FAQ</li>
                  </ul>


                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 footerDivFirst">
                  <label>LEGAL</label>
                  <ul>
                  <li>Privacy & Security</li>
                  <li>Terms of Use</li>
                  <li>Disclaimers</li>
                  <li>Licenses</li>
                  <li>NMLS AccessOpens A New Window.</li>
                  <li>Eligibility Criteria</li>
                 <li> Accessibility</li>
                 <li> Business Continuity</li>
                  </ul>


                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 footerDivFirst">
                  <label>QUESTIONS</label>
                  <ul>
                 <li> FAQ</li>
                 <li> Contact Us</li>
                 <li> Tweet @SoFiSupport</li>
                 <li> Customer Support:</li>
                
                 <li> Home Loans General Support:</li>
               
                 <li> homeloans@sofi.com</li>
                 <li> Invest Support:</li>
                 <li> For Invest Support Callinvestsupport@sofi.com</li>
                  </ul>


                </div>
                <div className="col-lg-4 col-md-2 col-sm-2 col-xs-2 footerDivFirst">
                  <label>HEAR ABOUT SOFI TIPS, EXPERIENCES & MORE</label>
                   <div className="col-lg-8 col-md-3 col-sm-3 col-xs-3 inputContainerEH ">
                     <input type="text" className="customInput col-lg-10 col-md-6 col-sm-6 col-xs-6" placeholder="Enter Email Address"/>
                      <span className="searchIcon col-lg-2"><i class="fa fa-chevron-right iconS"></i></span>
                    </div>

                </div>
            </div>
    );
  }
}
