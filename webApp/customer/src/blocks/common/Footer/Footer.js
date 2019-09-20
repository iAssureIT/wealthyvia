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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite footerContainer ">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 footerDivFirst">
                <label>Products</label>
                <ul>
                    <li>FlyNifty</li>
                    <li>Safest of Safe stocks</li>
                    <li>Unlisted Stocks</li>
                   <li> USA Stocks</li>
                   <li> Unlisted Stocks</li>
                   <li> Artha 5GCPM Midcap Large cap Portfolio and small Cases</li>
                 
                </ul>


                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 footerDivFirst">
                  <label>Company</label>
                  <ul>
                  <a href="/about-us"><li >About Us</li></a>
                  <li>Blogs</li>
                 <li>Disclaimers</li>
                  <li>Numbers</li>
                  <li>Registrations certifications </li>
                  
                 
                  </ul>


                </div>
              {/*  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 footerDivFirst">
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


                </div>*/}
                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 footerDivFirst">
                  <label>Get In Touch</label>
                  <ul>
                 <li> FAQ</li>
                  <a href="/contact-us"><li >Contact Us</li></a>
              {/*   <li> Tweet @WealthyviaSupport</li>
                 <li> Customer Support:</li>
                
                 <li> Home Loans General Support:</li>
               
                 <li> homeloans@Wealthyvia.com</li>
                 <li> Invest Support:</li>
                 <li> For Invest Support Callinvestsupport@Wealthyvia.com</li>*/}
                  </ul>


                </div>
                <div className="col-lg-4 col-md-4 col-sm-6   col-xs-10 footerDivFirst">
                  <label>Hear about wealthyvia tips, experience & more</label>
                   <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 inputContainerEH ">
                     <input type="text" className="customInput col-lg-10 col-md-10 col-sm-10 col-xs-10" placeholder="Enter Email Address"/>
                      <span className="searchIcon col-lg-2 col-md-2 col-xs-2 col-sm-2"><i class="fa fa-chevron-right iconS"></i></span>
                    </div>
                 {/* <div className="col-lg-12 col-md-10 col-mg-offset-1 col-sm-10 col-xs-12">
                    <div className="row">
                      <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        <i class="fa fa-facebook"></i>
                      </div>
                      <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        <i class="fa fa-linkedin" aria-hidden="true"></i>

                      </div> <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook">
                        <i class="fa fa-pinterest"></i>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        <i class="fa fa-instagram" aria-hidden="true"></i>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        <i class="fa fa-twitter" aria-hidden="true"></i>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        <i class="fa fa-snapchat" aria-hidden="true"></i>


                      </div>
                    </div>
                  </div>*/}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                    <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-6 col-xs-5 imgContainer row">
                      <img src="/images/appstore.png"/>
                    </div>
                    <div className="col-lg-4 col-md-5 col-md-offset-1 col-sm-4 col-xs-3  col-xs-offset-3 imgContainer">
                      <img src="/images/googleplay.png"/>

                    </div>
                  </div>
                  </div>

                </div>
            </div>
    );
  }
}
