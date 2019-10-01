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
                {/*  <li>Blogs</li>
                 <li>Disclaimers</li>
                  <li>Numbers</li>
                  <li>Registrations certifications </li>*/}
                  
                 
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
                  <a href="/contact-us"><li >Contact Us</li></a>
              {/*   <li> Tweet @WealthyviaSupport</li>
                 <li> FAQ</li>
                 <li> Customer Support:</li>
                
                 <li> Home Loans General Support:</li>
               
                 <li> homeloans@Wealthyvia.com</li>
                 <li> Invest Support:</li>
                 <li> For Invest Support Callinvestsupport@Wealthyvia.com</li>*/}
                  </ul>


                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 footerDivFirst">
                  <label>Hear about wealthyvia tips, experience & more</label>
                   <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 inputContainerEH ">
                     <input type="text" className="customInput col-lg-10 col-md-10 col-sm-10 col-xs-10" placeholder="Enter Email Address"/>
                      <span className="searchIcon col-lg-2 col-md-2 col-xs-2 col-sm-2"><i className="fa fa-chevron-right iconS"></i></span>
                    </div>
                  <div className="hidden-lg hidden-md  col-sm-10 col-xs-12">
                    <div className="row">
                     <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook ">
{/*                        <i className="fa fa-linkedin" aria-hidden="true"></i>
*/}
                            <img src="/images/linkedin1.png"/>
                      </div> 
                      <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook ">
                       {/* <i className="fa fa-pinterest"></i>*/}
                         <img src="/images/facebook.png"/>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook  ">
                       {/* <i className="fa fa-instagram" aria-hidden="true"></i>*/}
                        <img src="/images/twitter.png"/>


                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook ">
                       {/* <i className="fa fa-twitter" aria-hidden="true"></i>*/}
                         <img src="/images/snapchat.png"/>

                      </div> <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                        {/*<i className="fa fa-snapchat" aria-hidden="true"></i>*/}
                        <img src="/images/instagram.png"/>


                      </div>
                        <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook  ">
                         <img src="/images/pinterest.png"/>
                      </div>                    </div>
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
